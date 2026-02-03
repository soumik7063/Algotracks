import React from "react";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";
import { useState } from "react";
import Error from "../../Error";
import Loading from "../../Loading";
import CP_ids from "../profile/CP_ids";
import RecomendQuestions from './RecomendQuestions'
import { useEffect } from "react";
import { Profilecontext } from "../profile/ProfileContext";

const Recomend = () => {
  const [quesLoading, setquesLoading] = useState(false);
  const { user, isLoading } = useContext(AuthContext);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [problems, setProblems] = useState([]);
  const [CFid, setCFid] = useState("");
  const { codeforceData } =useContext(Profilecontext);
  const rating = codeforceData?.rating;
  useEffect(() => {
    if (user && user.cpProfiles && user.cpProfiles["Codeforce"]) {
      setCFid(user.cpProfiles["Codeforce"]);
    }
  }, [user]);
  const handelFetch = async () => {
    if(!user._id) {
      setError("User not fetched properly , try again")
      console.log(user._id)
      return;
    };
    try {
      setquesLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/recomend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }, 
        body: JSON.stringify({ _id:user._id }),
      });
      const data = await res.json();
      if (data.success) {
        setProblems(data.problems);
      } else {
        setIsError(true);
        setError(data.message);
      }
    } catch (error) {
      setIsError(true);
      setError(error.message);
    }finally{
      setquesLoading(false)
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error error={error} />;
  }
return (
  <div className="mt-16 bg-gray-900"> 
    <div className="bg-white max-w-[1280px] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300  mx-auto">
      {!CFid && (
        <div>
          <div className="flex justify-center items-center h-20 flex-col">
            <p className="text-2xl font-bold text-gray-400">
              Your Codeforce ID is not found
            </p>
            <p className="text-xl font-semibold text-gray-300">
              Please update it
            </p>
          </div>
          <div className="md:w-2xl mx-auto">
            <CP_ids platform="Codeforce" />
          </div>
        </div>
      )}
      {CFid && (
        <div className="bg-gradient-to-r from-gray-900 to-indigo-900 py-6 px-6">
          <h1 className="text-xl font-bold text-gray-200">Codeforce id: {CFid}</h1>
          <h1 className="font-semibold text-xl text-gray-200">Rating: {rating}</h1>
          <button disabled={!user?._id || quesLoading} className="bg-blue-900 text-gray-100 py-2 px-3 rounded-md my-3 font-semibold cursor-pointer" onClick={handelFetch}>
            Recomend Questions
          </button>
          {quesLoading ? (
            <Loading />
          ) : (
            <RecomendQuestions problems={problems} />
          )}
          
        </div>
      )}
    </div>
  </div>
);
};
export default Recomend;
