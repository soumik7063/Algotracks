import React, { useState } from 'react'
import CodeforcesContest from './contest/codeforcesContest'
import LeetcodeContest from './contest/LeetcodeContest'
import AtcoderContest from './contest/AtcoderContest'
const Contest = () => {
  const[activeTab,setActiveTab] = useState('Codeforces');
  return (
    <div className='mt-20'>
      <div className="tabs flex rounded-md shadow-sm overflow-hidden">
                        <button 
                            onClick={() => setActiveTab('Codeforces')}
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'Codeforces' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Codeforces
                        </button>
                        <button 
                            onClick={() => setActiveTab('Leetcode')}
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'Leetcode' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Leetcode
                        </button>
                        <button 
                            onClick={() => setActiveTab('Codechef')}
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'Codechef' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Codechef
                        </button>
                        <button 
                            onClick={() => setActiveTab('Atcoder')}
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'Atcoder' 
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