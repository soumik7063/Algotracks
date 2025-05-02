import React, { useState, useEffect } from 'react';

const CodeforcesContest = () => {
    const [contestData, setContestData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [pastContest, setPastContest] = useState(null);
    const [upcomingContest, setUpcomingContest] = useState(null);
    const [error, setError] = useState(null);
    // For pagination of past contests
    const [displayCount, setDisplayCount] = useState(10);
    // For tab selection
    const [activeTab, setActiveTab] = useState('upcoming');
    const [bookmarked, setBookmarked] = useState({});

    useEffect(() => {
        if (contestData) {
            setPastContest(contestData.filter(contest => contest.phase === 'FINISHED'));
            setUpcomingContest(contestData.filter(contest => contest.phase === 'BEFORE'));
        }
    }, [contestData]);

    useEffect(() => {
        handleSearch();
    }, []);

    useEffect(() => {
        if (upcomingContest && upcomingContest.length > 0) {
            const storedBookmarks = localStorage.getItem('contestBookmarks');
            if (storedBookmarks) {
                setBookmarked(JSON.parse(storedBookmarks));
            } else {
                const initialBookmarks = {};
                setBookmarked(initialBookmarks);
            }
        }
    }, [upcomingContest]);

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('https://codeforces.com/api/contest.list?gym=false');
            const data = await response.json();
            if (data.status === 'OK') {
                setContestData(data.result);
                // Reset display count when loading new data
                setDisplayCount(10);
            } else {
                setError('Error fetching contest data');
                console.error('Error fetching contest data');
            }
        } catch (err) {
            setError('Failed to fetch contest data. Please try again later.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleShowMore = () => {
        setDisplayCount(prevCount => prevCount + 10);
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getTimeRemaining = (startTimeSeconds) => {
        const now = Math.floor(Date.now() / 1000);
        const timeRemaining = startTimeSeconds - now;
        
        if (timeRemaining <= 0) return "Started";
        
        const days = Math.floor(timeRemaining / 86400);
        const hours = Math.floor((timeRemaining % 86400) / 3600);
        const minutes = Math.floor((timeRemaining % 3600) / 60);
        
        if (days > 0) {
            return `${days}d ${hours}h`;
        } else {
            return `${hours}h ${minutes}m`;
        }
    };

    const toggleBookmark = (id) => {
        const newBookmarked = {
            ...bookmarked,
            [id]: !bookmarked[id]
        };
        
        setBookmarked(newBookmarked);
        
        localStorage.setItem('contestBookmarks', JSON.stringify(newBookmarked));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-6 px-6">
                    <h1 className="text-white text-2xl md:text-3xl font-bold text-center">Codeforces Contest Calendar</h1>
                    <p className="text-blue-100 text-center mt-2">Track upcoming and past competitive programming contests</p>
                </div>
                
                {/* Action Bar */}
                <div className="bg-gray-100 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="tabs flex rounded-md shadow-sm overflow-hidden">
                        <button 
                            onClick={() => setActiveTab('upcoming')}
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'upcoming' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Upcoming Contests
                        </button>
                        <button 
                            onClick={() => setActiveTab('past')}
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'past' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Past Contests
                        </button>
                    </div>
                    
                    <button 
                        onClick={handleSearch}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Refreshing...
                            </>
                        ) : 'Refresh Contests'}
                    </button>
                </div>
                
                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 m-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Loading State */}
                {isLoading && !error && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
                    </div>
                )}
                
                {/* Content */}
                {!isLoading && !error && contestData && (
                    <div className="p-6">
                        {/* Upcoming Contests Tab */}
                        {activeTab === 'upcoming' && (
                            <>
                                <h2 className="text-xl font-semibold mb-6 text-gray-800">Upcoming Contests</h2>
                                {upcomingContest && upcomingContest.length > 0 ? (
                                    <div className="grid gap-6">
                                        {upcomingContest.slice().reverse().map(contest => {
                                            const startDate = new Date(contest.startTimeSeconds * 1000);
                                            const hours = Math.floor(contest.durationSeconds / 3600);
                                            const minutes = Math.floor((contest.durationSeconds % 3600) / 60);
                                            const timeRemaining = getTimeRemaining(contest.startTimeSeconds);
                                            
                                            return (
                                                <div key={contest.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                                                    <div className="md:flex">
                                                        {/* Time remaining badge */}
                                                        <div className="md:flex-shrink-0 flex items-center justify-center bg-blue-50 text-blue-700 font-semibold p-4 md:w-32">
                                                            <div className="text-center">
                                                                <div className="text-sm uppercase tracking-wide">Starts in</div>
                                                                <div className="text-lg font-bold">{timeRemaining}</div>
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Contest details */}
                                                        <div className="p-4 md:p-6 flex-1">
                                                            <a 
                                                                href={`https://codeforces.com/contest/${contest.id}`} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                                className="text-lg md:text-xl font-semibold text-blue-600 hover:text-blue-800 hover:underline transition mb-2 inline-block"
                                                            >
                                                                {contest.name}
                                                            </a>
                                                            <div className='flex justify-between'>
                                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 w-full">
                                                                    <div>
                                                                        <span className="block text-sm text-gray-500">Start Time</span>
                                                                        <span className="font-medium">{formatDate(contest.startTimeSeconds)}</span>
                                                                    </div>
                                                                    
                                                                    <div>
                                                                        <span className="block text-sm text-gray-500">Duration</span>
                                                                        <span className="font-medium">{`${hours}h ${minutes}m`}</span>
                                                                    </div>
                                                                    
                                                                    <div>
                                                                        <span className="block text-sm text-gray-500">Contest ID</span>
                                                                        <span className="font-medium">{contest.id}</span>
                                                                    </div>
                                                                </div>
                                                                <div 
                                                                    onClick={() => toggleBookmark(contest.id)} 
                                                                    className='text-3xl font-bold cursor-pointer'
                                                                    style={{ color: bookmarked[contest.id] ? '#FFD700' : '#808080' }}
                                                                >
                                                                    ★
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                        <h3 className="mt-2 text-lg font-medium text-gray-900">No upcoming contests</h3>
                                        <p className="mt-1 text-sm text-gray-500">There are no upcoming contests scheduled at the moment.</p>
                                    </div>
                                )}
                            </>
                        )}
                        
                        {/* Past Contests Tab */}
                        {activeTab === 'past' && (
                            <>
                                <h2 className="text-xl font-semibold mb-6 text-gray-800">Past Contests</h2>
                                {pastContest && pastContest.length > 0 ? (
                                    <>
                                        <div className="grid gap-4">
                                            {pastContest.slice(0, displayCount).map(contest => {
                                                const startDate = new Date(contest.startTimeSeconds * 1000);
                                                const hours = Math.floor(contest.durationSeconds / 3600);
                                                const minutes = Math.floor((contest.durationSeconds % 3600) / 60);
                                                
                                                return (
                                                    <div key={contest.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow">
                                                        <div className="p-4">
                                                            <div className="flex justify-between items-start">
                                                                <a 
                                                                    href={`https://codeforces.com/contest/${contest.id}`} 
                                                                    target="_blank" 
                                                                    rel="noopener noreferrer"
                                                                    className="text-md font-medium text-blue-600 hover:text-blue-800 hover:underline transition"
                                                                >
                                                                    {contest.name}
                                                                </a>
                                                                
                                                                <div 
                                                                    onClick={() => toggleBookmark(contest.id)}
                                                                    className='text-2xl font-bold cursor-pointer ml-2'
                                                                    style={{ color: bookmarked[contest.id] ? '#FFD700' : '#808080' }}
                                                                >
                                                                    ★
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 text-sm">
                                                                <div className="text-gray-500">
                                                                    <span className="font-medium">Date:</span> {formatDate(contest.startTimeSeconds)}
                                                                </div>
                                                                <div className="text-gray-500">
                                                                    <span className="font-medium">Duration:</span> {`${hours}h ${minutes}m`}
                                                                </div>
                                                                <div className="text-gray-500">
                                                                    <span className="font-medium">ID:</span> {contest.id}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        
                                        {pastContest.length > displayCount && (
                                            <div className="mt-6 text-center">
                                                <button 
                                                    onClick={handleShowMore}
                                                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                >
                                                    Show More
                                                    <svg className="ml-1 -mr-1 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <h3 className="mt-2 text-lg font-medium text-gray-900">No past contests</h3>
                                        <p className="mt-1 text-sm text-gray-500">There are no past contests in the system.</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
            
            {/* Footer */}
            <div className="mt-4 text-center text-sm text-gray-500">
                Data provided by Codeforces API. Last updated: {new Date().toLocaleString()}
            </div>
        </div>
    );
};

export default CodeforcesContest;