import React, { useState } from 'react'
import CodeforcesContest from './contest/CodeforcesContest'
import LeetcodeContest from './contest/LeetcodeContest'
import AtcoderContest from './contest/AtcoderContest'
const Contest = () => {
  const[activeTab,setActiveTab] = useState('Codeforces');
  return (
    <div className='mt-17 bg-gray-900'>
      <div className="tabs flex rounded-2xl shadow-sm overflow-hidden">
                        <button 
                            onClick={() => setActiveTab('Codeforces')}
                            className={`mt-2 mx-2 rounded-2xl px-4 py-2 text-sm font-medium ${activeTab === 'Codeforces' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Codeforces
                        </button>
                        <button 
                            onClick={() => setActiveTab('Leetcode')}
                            className={`mt-2 mx-2 rounded-2xl px-4 py-2 text-sm font-medium ${activeTab === 'Leetcode' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Leetcode
                        </button>
                        <button 
                            onClick={() => setActiveTab('Codechef')}
                            className={`mt-2 mx-2 rounded-2xl px-4 py-2 text-sm font-medium ${activeTab === 'Codechef' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Codechef
                        </button>
                        <button 
                            onClick={() => setActiveTab('Atcoder')}
                            className={`mt-2 mx-2 rounded-2xl px-4 py-2 text-sm font-medium ${activeTab === 'Atcoder' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Atcoder
                        </button>
                    </div>
          {activeTab === 'Codeforces' && <CodeforcesContest />}
          {activeTab === 'Leetcode' && <LeetcodeContest />}
          {activeTab === 'Atcoder' && <AtcoderContest />}
    </div>
  )
}

export default Contest