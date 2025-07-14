import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../AuthContext'
import {Link} from 'react-router-dom'
const Bookmark = () => {
    const [greetmsg, setgreetmsg] = useState("")
    const [bookmarks,setbookmarks] = useState(null)
    const {user} = useContext(AuthContext);
    useEffect(()=>{
      if(user && user.bookmarks){
        setbookmarks(user.bookmarks)
      }
       console.log(user.bookmarks)
    },[user.bookmarks])
    
    useEffect(()=>{
      const now = new Date()
    const isTime = now.toLocaleTimeString("en-IN",{hour12:false})
    greeting(parseInt(isTime))
    },[])

    function greeting(time){
      if(time>=12 && time<16) setgreetmsg(()=>"Good Afternoon ")
      else if(time>=16 && time<=23) setgreetmsg(()=>"Good Evening ")
      else setgreetmsg(()=>"Good Morning ");
    }
  return (

    <div className='mt-25'>
     <div>
        <h1>Codeforces Bookmarks</h1>
        {
          bookmarks && bookmarks["Codeforce"] && bookmarks["Codeforce"].map((item,idx)=>{
             return <div key={idx}>
              <Link target='_blank' to={`https://codeforces.com/contests/`}>Codeforce contest {item}</Link>
            </div>
          })
        }
        {
          bookmarks && bookmarks["Leetcode"] && bookmarks["Leetcode"].map((item,idx)=>{
             return <div key={idx}>
              <Link target='_blank' to={`https://codeforces.com/contests/`}>Codeforce contest {item}</Link>
            </div>
          })
        }
     </div>
    </div>
  )
}

export default Bookmark