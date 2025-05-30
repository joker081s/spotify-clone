import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { PlayerContext } from '../../context/PlayerContext'

const Player = () => {
    const { 
        track, 
        playStatus, 
        play, 
        pause, 
        previous, 
        next, 
        seekBar, 
        seekBg, 
        seekSong, 
        time,
        volume,
        setVolume,
        isLoading
    } = useContext(PlayerContext);

    const handleVolumeChange = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const x = e.clientX - rect.left;
        setVolume(x / width);
    };

    return (
        <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
            <div className='hidden items-center gap-4 lg:flex'>
                <img className='w-12' src={track.image} alt="" />
                <div>
                    <p>{track.name}</p>
                    <p className="text-gray-400 text-sm">{track.desc.slice(0, 12)}</p>
                </div>
            </div>
            <div className='flex flex-col items-center gap-1 m-auto'>
                <div className='flex gap-4'>
                    <img className='w-4 cursor-pointer opacity-50 hover:opacity-100' src={assets.shuffle_icon} alt="shuffle" />
                    <img 
                        className='w-4 cursor-pointer opacity-75 hover:opacity-100' 
                        onClick={previous} 
                        src={assets.prev_icon} 
                        alt="previous" 
                    />
                    {isLoading ? (
                        <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                    ) : playStatus ? (
                        <img 
                            className='w-4 cursor-pointer opacity-75 hover:opacity-100' 
                            onClick={pause} 
                            src={assets.pause_icon} 
                            alt="pause" 
                        />
                    ) : (
                        <img 
                            className='w-4 cursor-pointer opacity-75 hover:opacity-100' 
                            onClick={play} 
                            src={assets.play_icon} 
                            alt="play" 
                        />
                    )}
                    <img 
                        className='w-4 cursor-pointer opacity-75 hover:opacity-100' 
                        onClick={next} 
                        src={assets.next_icon} 
                        alt="next" 
                    />
                    <img className='w-4 cursor-pointer opacity-50 hover:opacity-100' src={assets.loop_icon} alt="loop" />
                </div>
                <div className='flex items-center gap-5'>
                    <p className="w-10 text-xs text-right">{time.currentTime.minute}:{time.currentTime.second}</p>
                    <div 
                        onClick={seekSong} 
                        ref={seekBg} 
                        className='w-[60vw] max-w-[500px] h-1 bg-gray-600 rounded-full cursor-pointer group relative'
                    >
                        <div ref={seekBar} className='h-full bg-white group-hover:bg-green-500 rounded-full transition-colors' />
                        <div className="absolute top-1/2 right-0 w-3 h-3 bg-white rounded-full -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ right: `${(1 - (time.currentTime.minute * 60 + parseInt(time.currentTime.second)) / (time.totalTime.minute * 60 + parseInt(time.totalTime.second))) * 100}%` }} />
                    </div>
                    <p className="w-10 text-xs">{time.totalTime.minute}:{time.totalTime.second}</p>
                </div>
            </div>
            <div className='hidden items-center gap-4 opacity-75 lg:flex'>
                <img className='w-4 opacity-50 hover:opacity-100 cursor-pointer' src={assets.mic_icon} alt="mic" />
                <img className='w-4 opacity-50 hover:opacity-100 cursor-pointer' src={assets.queue_icon} alt="queue" />
                <img className='w-4 opacity-50 hover:opacity-100 cursor-pointer' src={assets.speaker_icon} alt="speaker" />
                <div className="flex items-center gap-2">
                    <img className='w-4 opacity-75 hover:opacity-100 cursor-pointer' src={assets.volume_icon} alt="volume" />
                    <div 
                        className='w-24 h-1 bg-gray-600 rounded-full cursor-pointer group relative'
                        onClick={handleVolumeChange}
                    >
                        <div 
                            className='h-full bg-white group-hover:bg-green-500 rounded-full transition-colors' 
                            style={{ width: `${volume * 100}%` }}
                        />
                        <div 
                            className="absolute top-1/2 right-0 w-3 h-3 bg-white rounded-full -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" 
                            style={{ right: `${(1 - volume) * 100}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Player