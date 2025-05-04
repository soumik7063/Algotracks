import React, { useContext } from 'react'
import { AuthContext } from '../../AuthContext'

const Bookmark = () => {
    const {user} = useContext(AuthContext);
    console.log(user)
  return (

    <div>Bookmark</div>
  )
}

export default Bookmark