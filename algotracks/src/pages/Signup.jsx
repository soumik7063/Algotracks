import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../AuthContext.jsx'
const AuthForm = () => {
    const {login} = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  
  // Form state for signup
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  });
  const[loading , setloading] = useState(false);
  
  // Form state for login
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });
  
  // Error message state
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  // Handle input changes for signup form
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });
  };
  
  // Handle input changes for login form
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };
  
  // Handle signup form submission
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return setErrorMsg('Username, email, and password are required');
    }
    
    try {
      setloading(true);
      const response = await fetch('https://algotracks.onrender.com/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      });
      
      const res = await response.json();
      const { message, success } = res;
      
      if (success) {
        setSuccessMsg(message || 'Signup successful!');
        // login(res.user,res.token)
        setTimeout(() => {
          setIsLogin(true)
          // navigate('/profile');
        }, 2000);
      } else {
        setErrorMsg(message || 'Signup failed');
      }
    } catch (error) {
      setErrorMsg('An error occurred. Please try again.');
      console.log(error);
    } finally {
      setloading(false);
      setSignupInfo({
        name: '',
        email: '',
        password: ''
      });
    }
  };
  
  // Handle login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    
    const { email, password } = loginInfo;
    if (!email || !password) {
      return setErrorMsg('Email and password are required');
    }
    
    try {
      setloading(true);
      const response = await fetch('https://algotracks.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });
      
      const res = await response.json();
      const { message, success, token } = res;
      if (success) {
        // Store token if provided
        if (token) {
          localStorage.setItem('authToken', token);
        }
        
        setSuccessMsg(message || 'Login successful!');
        login(res.user,res.token)
        setTimeout(() => {
          navigate('/profile');
        }, 2000);
      } else {
        setErrorMsg(message || 'Login failed');
      }
    } catch (error) {
      setErrorMsg('An error occurred. Please try again.');
      console.log(error);
    } finally {
      setloading(false);
      setLoginInfo({
        email: '',
        password: ''
      });
    }
  };
  
  // Toggle between login and signup forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMsg('');
    setSuccessMsg('');
  };
  
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full border rounded-2xl shadow-lg">
        <h2 className="text-2xl text-center font-semibold bg-blue-500 py-3 rounded-t-2xl text-white">
          {isLogin ? 'Welcome Back' : 'Create your account'}
        </h2>
        
        <h1 className="text-2xl font-bold text-center mt-3">
          {isLogin ? 'Login' : 'SignUp'}
        </h1>
        
        {errorMsg && (
          <div className="mx-8 mt-4 p-2 bg-red-100 text-red-700 rounded-md text-center">
            {errorMsg}
          </div>
        )}
        
        {successMsg && (
          <div className="mx-8 mt-4 p-2 bg-green-100 text-green-700 rounded-md text-center">
            {successMsg}
          </div>
        )}
        
        {isLogin ? (
          // Login Form
          <form 
            onSubmit={handleLoginSubmit} 
            className="flex flex-col gap-6 pt-8 pb-5 px-8 w-full text-xl"
          >
            <label className="flex flex-col">
              <span>Email:</span>
              <input 
                className="border border-gray-300 px-3 py-2 mt-1 text-base rounded-md"
                name="email"
                value={loginInfo.email}
                onChange={handleLoginChange}
                type="email"
                placeholder="your@gmail.com"
              />
            </label>
            
            <label className="flex flex-col">
              <span>Password:</span>
              <input 
                className="border border-gray-300 px-3 py-2 mt-1 text-base rounded-md"
                name="password"
                value={loginInfo.password}
                onChange={handleLoginChange}
                type="password"
                placeholder="*********"
              />
            </label>
            
            <button 
              className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-semibold py-2 rounded-md transition-colors"
              type="submit"
            >
              {
                loading?'logging...':'login'
              }
            </button>
          </form>
        ) : (
          // Signup Form
          <form 
            onSubmit={handleSignupSubmit} 
            className="flex flex-col gap-6 pt-8 pb-5 px-8 w-full text-xl"
          >
            <label className="flex flex-col">
              <span>Username:</span>
              <input 
                className="border border-gray-300 px-3 py-2 mt-1 text-base rounded-md"
                name="name"
                value={signupInfo.name}
                onChange={handleSignupChange}
                type="text"
                placeholder="username"
              />
            </label>
            
            <label className="flex flex-col">
              <span>Email:</span>
              <input 
                className="border border-gray-300 px-3 py-2 mt-1 text-base rounded-md"
                name="email"
                value={signupInfo.email}
                onChange={handleSignupChange}
                type="email"
                placeholder="your@gmail.com"
              />
            </label>
            
            <label className="flex flex-col">
              <span>Password:</span>
              <input 
                className="border border-gray-300 px-3 py-2 mt-1 text-base rounded-md"
                name="password"
                value={signupInfo.password}
                onChange={handleSignupChange}
                type="password"
                placeholder="*********"
              />
            </label>
            
            <button 
              className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-semibold py-2 rounded-md transition-colors"
              type="submit"
            >
             {loading?'signing up...' :'signUp'}
            </button>
          </form>
        )}
        
        <div className="flex justify-between my-4 px-8 pb-4">
          {isLogin && (
            <button 
              onClick={() => {/* Add forgot password functionality */}}
              className="text-blue-700 hover:underline text-sm"
            >
              Forgot Password?
            </button>
          )}
          <button 
            onClick={toggleForm}
            className="ml-auto text-sm"
          >
            {isLogin ? (
              <>Don't have an account? <span className="text-blue-700 hover:underline">Sign Up</span></>
            ) : (
              <>Already have an account? <span className="text-blue-700 hover:underline">Login</span></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;