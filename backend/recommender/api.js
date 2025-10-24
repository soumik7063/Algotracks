import axios from 'axios';
export  class CodeforcesAPI {
  constructor() {
    this.base = 'https://codeforces.com/api';
    this.cache = {};
  }

  async _get(path, params = {}) {
    const key = path + JSON.stringify(params);
    if (this.cache[key]) return this.cache[key];
    const url = this.base + path;
    const resp = await axios.get(url, { params });
    if (resp.data && resp.data.status === 'OK') {
      this.cache[key] = resp.data.result;
      return resp.data.result;
    } else {
      throw new Error('CF API error: ' + JSON.stringify(resp.data));
    }
  }

  async getProblemset() {
    return await this._get('/problemset.problems');
  }


  async getUserSubmissions(handle) {
    return await this._get('/user.status', { handle, from: 1, count: 100000 });
  }


  async getUserInfo(handle) {
    const res = await this._get('/user.info', { handles: handle });
    return Array.isArray(res) ? res[0] : res;
  }
}

