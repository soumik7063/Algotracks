import React, { useContext } from 'react'
import { AuthContext } from '../AuthContext'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const { isLoggedIn, isLoading } = useContext(AuthContext);

    if(isLoading){
        return <div>
            loading...
        </div>
    }
    return isLoggedIn ? children : <Navigate to="/signup"/>
}

export default ProtectedRoute