import React, { useContext } from 'react'
import { AuthContext } from '../../AuthContext'
import CP_ids from './CP_ids'

const UpdateProfile = () => {
  const {user,isLoggedIn} = useContext(AuthContext)

  if(isLoggedIn) return (
    <div className='max-w-[1200px] flex justify-center flex-col mx-auto'>
      <CP_ids platform="name"/>
      <CP_ids platform="email"/>
      <CP_ids platform="Codeforce"/>
      <CP_ids platform="Leetcode"/>
      <CP_ids platform="Codechef"/>
      <CP_ids platform="Atcoder"/>
    </div>
  )
}

export default UpdateProfile