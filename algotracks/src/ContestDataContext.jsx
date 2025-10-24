import React, { createContext, useEffect, useState } from 'react'
import {
  getUpcomingContests,
  getPastContests,
} from "./services/Leetcode";

export const contestContext = createContext(null);
const ContestDataContext = ({children}) => {
    const [contestData, setContestData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingLeetcode, setIsLoadingLeetcode] = useState(true);
  const [error, setError] = useState(null);
  const [pastContest, setPastContest] = useState(null);
  const [upcomingContest, setUpcomingContest] = useState(null);
  useEffect(()=>{
    if(upcomingContest === null || pastContest === null){
      const handleSearch = async () => {
          setIsLoadingLeetcode(true);
          try {
            const pastContestdata = await getPastContests();
            const PastConst = Object.values(pastContestdata.data).map((contest) => {
              return {
                id: contest.titleSlug.slice(length - 3),
                name: contest.titleSlug,
                durationSeconds: contest.duration,
              };
            });
            setPastContest(PastConst);
            const upcontestData = await getUpcomingContests();
            const Upcontest = Object.values(upcontestData.data).map((contest) => {
              return {
                id: contest.titleSlug.slice(length - 3),
                name: contest.titleSlug,
                durationSeconds: contest.duration,
                startTimeSeconds: contest.startTime,
              };
            });
            setUpcomingContest(Upcontest);
          } catch (err) {
            setError("Failed to fetch contest data. Please try again later.");
          } finally {
            setIsLoadingLeetcode(false);
          }
        };
        handleSearch();
    } else setIsLoadingLeetcode(false)
  },[upcomingContest,pastContest])
  useEffect(()=>{
    if(contestData === null){
        const fetchContest = async()=>{
            setIsLoading(true);
            setError(null)
            try {
                const response = await fetch("https://codeforces.com/api/contest.list?gym=false");
          const data = await response.json();
          if (data.status === "OK") {
            setContestData(data.result);
          } else {
            setError("Error fetching contest data: " );
          }
            } catch (error) {
                setError("Network error: Failed to fetch contest data.");
          console.error(err);
            }
            finally{
                setIsLoading(false)
            }
        }
        fetchContest()
    }else setIsLoading(false)
  },[contestData])
  return (
    <contestContext.Provider value={{contestData,isLoading,error,upcomingContest,pastContest,isLoadingLeetcode}}>
        {children}
    </contestContext.Provider>
  )
}

export default ContestDataContext