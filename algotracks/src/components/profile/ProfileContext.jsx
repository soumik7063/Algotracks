import { createContext, useContext, useState, useEffect } from 'react'
import { getUserProfile, getRecentSubmissions } from '../../services/Leetcode';
import { AuthContext } from "../../AuthContext";

export const Profilecontext = createContext(null)
const ProfileContext = ({ children }) => {
    const { user } = useContext(AuthContext);
    const LeetcodeUsername = user?.cpProfiles?.Leetcode;
    const CodeforceUsername = user?.cpProfiles?.Codeforce;
      const [codeforceData, setCodeforceDta] = useState(null);
    const [leetcodeData, setLeetcodeData] = useState(null);
    const [submissions, setSubmissions] = useState([]); 
    const [CodeforceSubmission, setCodeforceSubmission] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null); 
    const CodeforceLastSubmissionfetch = async()=>{
      if (!CodeforceUsername) {
        setIsError("No LeetCode username found in user profile");
        setIsLoading(false);
        return;
    }
    try {
      const lastsubmit = await fetch(`https://codeforces.com/api/user.status?handle=${CodeforceUsername}&from=1&count=20`)
      const data = await lastsubmit.json();
      if(data && data.status === "OK"){
        setCodeforceSubmission(data.result);
      }
    } catch (error) {
      console.error('Error fetching LeetCode data:', error);
            setIsError("Not finding user please check username");
            setCodeforceSubmission([]);
    }
    }
    const handleSearch = async () => {
        if (!LeetcodeUsername) {
            setIsError("No LeetCode username found in user profile");
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setIsError(null); 
            
            const submissionsData = await getRecentSubmissions(LeetcodeUsername, 100); 
            setSubmissions(submissionsData.data); 
            const ProfileInfo = await getUserProfile(LeetcodeUsername);
            setLeetcodeData(ProfileInfo.data);
        } catch (error) {
            console.error('Error fetching LeetCode data:', error);
            setIsError("Not finding user please check username");
            setLeetcodeData(null);
            setSubmissions([]);
        } finally {
            setIsLoading(false);
        }
    };
    const getUser = async () => {
      setIsLoading(true);
      setIsError(null);
      try {
        const response = await fetch(
          `https://codeforces.com/api/user.info?handles=${CodeforceUsername}`
        );
        const data = await response.json();

        if (data.status == "OK") {
          setCodeforceDta(data.result[0]);
        } else {
          setIsError("Codeforce User not found. Please check the username and try again.");
        }
      } catch (error) {
        setIsError("Failed to fetch user data. Please try again later.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    useEffect(() => {
        if (LeetcodeUsername && leetcodeData === null && submissions.length === 0 && !isError) {
            handleSearch();
        }
    }, [LeetcodeUsername]);
    useEffect(()=>{
        if(CodeforceUsername && codeforceData === null && CodeforceSubmission.length === 0 && !isError){
            getUser();
            CodeforceLastSubmissionfetch();
        }
    },[CodeforceUsername])
   
    const contextValue = {
        leetcodeData,
        submissions,
        isLoading,
        isError,
        LeetcodeUsername,
        handleSearch,
        codeforceData,
        CodeforceSubmission,
        refetch: handleSearch 
    };

    return (
        <Profilecontext.Provider value={contextValue}>
            {children}
        </Profilecontext.Provider>
    )
}
export default ProfileContext