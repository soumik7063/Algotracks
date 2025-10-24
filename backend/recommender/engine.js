const { sqrt, exp } = Math;

function l2norm(arr) {
  let s = 0;
  for (const v of arr) s += v*v;
  return Math.sqrt(s);
}

export class RecommenderEngine {
  constructor(cfApi) {
    this.cf = cfApi;
    this.problemCache = null;
    this.tagIndex = null;
  }

  async _buildProblemIndex() {
    if (this.problemCache) return;
    const data = await this.cf.getProblemset();
    const problems = data.problems || [];
    const tagSet = new Set();
    const items = problems.map(p => {
      const key = (p.contestId ? p.contestId : '') + '/' + (p.index||'') ;
      const rating = p.rating || null;
      const tags = p.tags || [];
      tags.forEach(t => tagSet.add(t));
      return { key, name: (p.name || key), tags, rating, url: `https://codeforces.com/problemset/problem/${p.contestId}/${p.index}` };
    });
    const tagList = Array.from(tagSet).sort();
    const tagIndex = Object.fromEntries(tagList.map((t,i)=>[t,i]));
    for (const it of items) {
      const vec = new Array(tagList.length).fill(0);
      for (const t of it.tags) {
        vec[tagIndex[t]] = 1;
      }
      it.tagVec = vec;
      it.tagNorm = l2norm(vec) || 0;
    }
    this.problemCache = items;
    this.tagIndex = tagIndex;
  }

  _userProfileFromSolved(solvedKeys) {
    const dim = Object.keys(this.tagIndex).length;
    const prof = new Array(dim).fill(0);
    for (const p of this.problemCache) {
      if (solvedKeys.has(p.key)) {
        for (let i=0;i<dim;i++) prof[i] += p.tagVec[i] || 0;
      }
    }
    const norm = l2norm(prof);
    if (norm === 0) return { vec: prof, norm: 0 };
    return { vec: prof.map(v=>v/norm), norm };
  }

  _cosineSim(vecA, vecB, normB) {
    if (!vecA || vecA.length===0) return 0;
    let dot = 0;
    for (let i=0;i<vecA.length;i++) dot += (vecA[i]||0) * (vecB[i]||0);
    if (!normB || normB===0) return 0;
    return dot / normB;
  }

  _difficultyScore(probRating, userRating) {
    if (!probRating || !userRating) return 1;
    const sigma = 0.3 * userRating;
    if (sigma === 0) return 1;
    const diff = probRating - userRating;
    return Math.exp(- (diff*diff) / (2 * sigma * sigma));
  }

  async recommend(handle, topN=50) {
    await this._buildProblemIndex();
    const subs = await this.cf.getUserSubmissions(handle);
    const solved = new Set();
    for (const s of subs) {
      if (s.verdict === 'OK' && s.problem) {
        const key = (s.problem.contestId ? s.problem.contestId : '') + '/' + (s.problem.index||'');
        solved.add(key);
      }
    }
    let userInfo = null;
    try {
      userInfo = await this.cf.getUserInfo(handle);
    } catch (e) {
      userInfo = null;
    }
    const userRating = userInfo && userInfo.rating ? userInfo.rating : null;

    const profile = this._userProfileFromSolved(solved);
    const alpha = 0.6, beta = 0.0, gamma = 0.4; 
    const scored = [];
    for (const p of this.problemCache) {
      if (solved.has(p.key)) continue;
      const sim = profile.norm===0 ? 0 : this._cosineSim(profile.vec, p.tagVec, p.tagNorm);
      const diff = this._difficultyScore(p.rating, userRating);
      const pop = 0; 
      const score = alpha * sim + beta * pop + gamma * diff;
      scored.push({ p, score, sim, diff });
    }
    scored.sort((a,b)=>b.score - a.score);
    return scored.slice(0, topN).map(s => ({
      name: s.p.name,
      url: s.p.url,
      tags: s.p.tags,
      rating: s.p.rating,
      score: Number(s.score.toFixed(6)),
      sim: Number(s.sim.toFixed(6)),
      diff: Number(s.diff.toFixed(6))
    }));
  }
}

