import React,{useContext,createContext, useState, useEffect} from 'react'

export const AuthContext = createContext()
export const AuthProvider = ({children}) => {
    const [isLoggedIn,setIsloggedin] = useState(false)
    const [user,setuser] = useState('');
    const [isLoading,setisLoading] = useState(false);
    useEffect(() => {
      const checkLoginStatus = async()=>{
        const token = localStorage.getItem('authToken')
        if(token){
            try {
                const response = fetch('http://localhost:3000/auth/me',{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                const data = await response.json();
                if(data.success){
                    setuser(data.user);
                    setIsloggedin(true);

                }else{
                    localStorage.removeItem('authToken');
                }
            } catch (error) {
                console.error('Error verifying authentication:', error);
          localStorage.removeItem('authToken');
            }
        }
        setisLoading(false);
      }
    
      checkLoginStatus()
    }, [])
    
0
    const login = (userData,token)=>{
        localStorage.setItem('authToken',token);
        setuser(userData);
         
        setIsloggedin(true);
    }
    const logout = ()=>{
        localStorage.removeItem('authToken')
        setuser(null)
        setIsloggedin(false)
    }
  return (
    <AuthContext.Provider
    value={{
        isLoggedIn,
        isLoading,
        login,
        logout,
        user
    }}
    >
        {children}
    </AuthContext.Provider>
  )
}
