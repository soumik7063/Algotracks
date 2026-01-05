import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Resetpassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [Cpassword, setCPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showMsg, setShowMsg] = useState('');
    const [checkPassword, setCheckPassword] = useState(true);
    const [token, setToken] = useState('');

    const handelPassword = async (e) => {
        e.preventDefault();
        setError('');
        setShowMsg('');

        if (password !== Cpassword) {
            setCheckPassword(false);
            setError("Password and confirm password should be same");
            return;
        }

        if (!token) {
            setError("No token available to reset password. Please ensure you've used the full link.");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/reset_password?token=` + token, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    { newPassword: Cpassword }
                )
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.msg || 'Failed to reset password. Please try again.');
                setShowMsg('');
            } else {
                setShowMsg('Password reset successfully! Redirecting to login...');
                setError('');
                setPassword('');
                setCPassword('');
                
                // Redirect after showing success message for a brief moment
                setTimeout(() => {
                    navigate('/signup'); // Assuming /signup is your login page
                }, 2000);
            }
        } catch (err) {
            setError(err.message || 'An unexpected error occurred. Please try again later.');
            setShowMsg('');
        } finally {
            // setLoading(false); // Do not set loading to false immediately if redirecting
        }
    };

    useEffect(() => {
        setCheckPassword(password === Cpassword);
        if (password === Cpassword && error === "Password and confirm password should be same") {
            setError('');
        }
    }, [password, Cpassword, error]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get('token');
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
        } else {
            setError("No token found in the URL. Please use the link from your email.");
        }
    }, []);

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
                <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>Reset Your Password</h2>
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
                {!token && error.includes("No token found") ? (
                    <p className="text-gray-600 text-center">Please make sure you are using the complete password reset link provided in your email.</p>
                ) : (
                    <form onSubmit={handelPassword} className='space-y-4'>
                        <p className='text-gray-600 text-center mb-4'>Enter and confirm your new password below.</p>

                        <div>
                            <label htmlFor="newPassword" className='block text-sm font-medium text-gray-700 mb-1'>New Password</label>
                            <input
                                id="newPassword"
                                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder='********'
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className='block text-sm font-medium text-gray-700 mb-1'>Confirm Password</label>
                            <input
                                id="confirmPassword"
                                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                                value={Cpassword}
                                onChange={(e) => setCPassword(e.target.value)}
                                type="password"
                                placeholder='********'
                                required
                            />
                        </div>
                        {!checkPassword && (
                            <div className="p-2 bg-red-100 text-red-700 rounded-md text-sm text-center">
                                Passwords do not match.
                            </div>
                        )}
                        <button
                            disabled={!checkPassword || loading || !token || password.length === 0 || Cpassword.length === 0}
                            className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center'
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
                                    Resetting...
                                </>
                            ) : (
                                "Reset Password"
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Resetpassword;