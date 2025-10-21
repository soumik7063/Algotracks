import React, { useState } from 'react'
import CodeforcesContest from './contest/CodeforcesContest'
import LeetcodeContest from './contest/LeetcodeContest'
import AtcoderContest from './contest/AtcoderContest'
import CodechefContest from './contest/CodechefContest';
const platforms = ['Codeforces', 'Leetcode', 'Atcoder','codechef'];
export const ActiveTab = ({platform, activeTab , setActiveTab })=>{
    return (
        <button 
            onClick={() => setActiveTab(platform)}
            className={`mt-2 mx-2 rounded-2xl px-4 py-2 text-sm font-medium ${activeTab === platform 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
        >
            {platform}
        </button>            
    )
}
const Contest = () => {
  const[activeTab,setActiveTab] = useState('Codeforces');
  return (
    <div className='mt-17 bg-gray-900'>
      <div className="tabs flex rounded-2xl shadow-sm overflow-hidden">
                        {
                            platforms.map((platform) => (
                                <ActiveTab key={platform} platform={platform} activeTab={activeTab} setActiveTab={setActiveTab}/>
                            ))
                        }
                        
                    </div>
          {activeTab === 'Codeforces' && <CodeforcesContest />}
          {activeTab === 'Leetcode' && <LeetcodeContest />}
          {activeTab === 'Atcoder' && <AtcoderContest />}
          {activeTab === 'codechef' && <CodechefContest />}
    </div>
  )
}

export default Contest