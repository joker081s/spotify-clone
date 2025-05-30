import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Welcome = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="bg-zinc-900 p-8 rounded-lg shadow-lg w-[90%] max-w-md">
                <div className="flex flex-col items-center mb-8">
                    <img src={assets.spotify_logo} alt="Spotify" className="w-40 mb-6" />
                    <h2 className="text-3xl font-bold text-white text-center">
                        Welcome to Spotify Clone
                    </h2>
                    <p className="text-gray-400 text-center mt-2">
                        Choose how you want to continue
                    </p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => navigate('/app')}
                        className="w-full bg-zinc-800 text-white py-3 px-4 rounded-full hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <span>Continue Without Login</span>
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 text-gray-500 bg-zinc-900">or</span>
                        </div>
                    </div>

                    <Link
                        to="/login"
                        className="w-full bg-green-500 text-white py-3 px-4 rounded-full hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                    >
                        Login to Your Account
                    </Link>

                    <div className="text-center">
                        <p className="text-gray-400">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-green-500 hover:text-green-400">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-xs text-gray-500 text-center">
                    <p>By continuing, you agree to our Terms of Service and Privacy Policy.</p>
                </div>
            </div>
        </div>
    );
};

export default Welcome; 