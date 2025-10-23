import User from '../models/DBmodel.js'
import { CodeforcesAPI } from '../../../codeforces_recommender_js/recommender/api.js';
import { RecommenderEngine } from '../../../codeforces_recommender_js/recommender/engine.js';

const cf = new CodeforcesAPI();
const engine = new RecommenderEngine(cf);

export const recomend = async(req, res) =>{
    // const {_id} = req.body ;
    // console.log(_id);
    // const user = await User.findById(_id);
    const email = "debrajdalai29@gmail.com";
    const user = await User.findOne({ email });

    const problems = user.cfProblems;
    const length = Array.isArray(problems) ? problems.length : 0;


    if(length){
        console.log(user.cfProblems);
    }else{
        const handle = user.cpProfiles.Codeforce;
        if(handle == ""){
            
        }else{
            const recs = await engine.recommend(handle, 50);
            console.log(recs);
            console.log(Object.keys(recs).length);
        }
    }
};