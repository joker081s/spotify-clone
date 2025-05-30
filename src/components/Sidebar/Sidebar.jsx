import React from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Sidebar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/welcome');
    };

    const handleLoginClick = () => {
        navigate('/welcome');
    };

    return (
        <div className='w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex'>
            <div className='bg-[#121212] h-[15%] rounded flex flex-col justify-around'>
                <div onClick={() => navigate('/app')} className='flex items-center gap-3 pl-8 cursor-pointer'>
                    <img className='w-6' src={assets.home_icon} alt="" />
                    <p className='font-bold'>Home</p>
                </div>
                <div className='flex items-center gap-3 text-white pl-8'>
                    <img className='w-6' src={assets.search_icon} alt="" />
                    <p className='font-bold'>Search</p>
                </div>
            </div>
            <div className="bg-[#121212] h-[85%] rounded flex flex-col">
                <div className='p-4 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <img className='w-8' src={assets.stack_icon} alt="" />
                        <p className='font-semibold'>Your Library</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <img className='w-5' src={assets.arrow_icon} alt="" />
                        <img className='w-5' src={assets.plus_icon} alt="" />
                    </div>
                </div>
                
                {/* User Profile Section */}
                <div className='mt-auto p-4 bg-[#121212] rounded-b'>
                    {user ? (
                        <div className='flex items-center justify-between mb-4'>
                            <div className='flex items-center gap-2'>
                                <div className='w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center'>
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <span className='font-medium'>{user.name}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className='px-4 py-1.5 bg-transparent border border-gray-500 text-white rounded-full hover:border-white transition-colors'
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className='flex items-center justify-between mb-4'>
                            <button
                                onClick={handleLoginClick}
                                className='w-full px-4 py-1.5 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform'
                            >
                                Log in to create and share playlists
                            </button>
                        </div>
                    )}
                </div>

                <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4'>
                    <h1>Create your first playlist</h1>
                    <p className='font-light'>it's easy we'll help you</p>
                    <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4'>Create playlist</button>
                </div>
                <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4'>
                    <h1>Let's find some podcasts to follow</h1>
                    <p className='font-light'>We'll keep you updated on new episodes</p>
                    <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4'>Browse podcasts</button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar