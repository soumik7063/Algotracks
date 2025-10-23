import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(''); 
    const [showMsg, setShowMsg] = useState(''); 
    const handleSubmit = async (e) => { 
        e.preventDefault();
        setError(''); 
        setShowMsg(''); 

        if (!email.trim()) { 
            setError("Please enter your email address.");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch('http://localhost:3000/forget_password', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email
                })
            });

            const data = await response.json();

            if (!response.ok) { 
                setError(data.msg || 'Failed to send reset email. Please try again.');
                setShowMsg('');
            } else {
                setShowMsg(data.msg || 'Password reset email sent! Redirecting to login...');
                setError('');
                setEmail(''); 

               
            }
        } catch (err) { 
            setError(err.message || 'An unexpected error occurred. Please try again later.');
            setShowMsg('');
        } finally {
             setLoading(false); 
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
                <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>Forgot Password</h2>
                <p className='text-gray-600 text-center mb-6'>
                    An email will be sent to your registered email ID, by which you can reset your password.
                </p>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm text-center">
                        {error}
                    </div>
                )}
                {showMsg && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm text-center">
                        {showMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label htmlFor="email" className='block text-sm font-medium text-gray-700 mb-1'>Enter your Registered Email</label>
                        <input
                            id="email"
                            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" 
                            placeholder='abc@example.com'
                            required
                        />
                    </div>
                    <button
                        disabled={loading || !email.trim()} 
                        className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer'
                        type='submit'
                    >
                        {loading ? (
                            <>
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Sending...
                            </>
                        ) : (
                            "Send Reset Link"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;