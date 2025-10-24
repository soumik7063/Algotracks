import User from '../models/DBmodel.js'
import  {CodeforcesAPI}  from '../recommender/api.js';
import { RecommenderEngine } from '../recommender/engine.js'
const cf = new CodeforcesAPI();
const engine = new RecommenderEngine(cf);

export const recomend = async(req, res) =>{
    const {_id} = req.body ;
    const user = await User.findById(_id);
    if (!user) {
        return res.status(403).json({ message: "user not found", success: false });
    }

    const problems = user.cfProblems;
    const length = Array.isArray(problems) ? problems.length : 0;


    if(length !== 0){
        res.status(201).json({success:true, problems: problems});
    }else{
        const handle = user.cpProfiles.Codeforce;
        const recs = await engine.recommend(handle, 50);
        const problems = Array.isArray(recs)
        ? recs.map(item => ({
            name: item.name,
            url: item.url,
            tags: item.tags,
            rating: item.rating
            }))
        : [];

        user.cfProblems = problems;    
        await user.save();   
        console.log(user.cfProblems);

        res.status(200).json({success:true, problems: problems});
    }
};

export const newRecomend = async(req, res)=>{
    const {_id} = req.body ;
    const user = await User.findById(_id);
    if (!user) {
        return res.status(403).json({ message: "user not found", success: false });
    }

    const handle = user.cpProfiles.Codeforce;
        const recs = await engine.recommend(handle, 20);
        const problems = Array.isArray(recs)
        ? recs.map(item => ({
            name: item.name,
            url: item.url,
            tags: item.tags,
            rating: item.rating
            }))
        : [];

        user.cfProblems = problems;    
        await user.save();   
        console.log(user.cfProblems);
        console.log("break");
        res.status(200).json({success:true, problems: problems});
    
};