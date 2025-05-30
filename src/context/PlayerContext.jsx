import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
    
    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [isLoading, setIsLoading] = useState(true);
    const [time, setTime] = useState({
        currentTime: {
            second: '00',
            minute: '0'
        },
        totalTime: {
            second: '00',
            minute: '0'
        }
    });

    const formatTime = (time) => {
        return {
            minute: Math.floor(time / 60),
            second: Math.floor(time % 60).toString().padStart(2, '0')
        };
    };

    const play = async () => {
        try {
            await audioRef.current.play();
            setPlayStatus(true);
        } catch (error) {
            console.error('Playback failed:', error);
        }
    };

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    };

    const setAudioVolume = (value) => {
        const newVolume = Math.max(0, Math.min(1, value));
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const previous = async () => {
        if (track.id > 0) {
            setIsLoading(true);
            const prevTrack = songsData[track.id - 1];
            setTrack(prevTrack);
            setPlayStatus(true);
        }
    };

    const next = async () => {
        if (track.id < songsData.length - 1) {
            setIsLoading(true);
            const nextTrack = songsData[track.id + 1];
            setTrack(nextTrack);
            setPlayStatus(true);
        }
    };

    const playWithId = async (id) => {
        if (id >= 0 && id < songsData.length) {
            setIsLoading(true);
            setTrack(songsData[id]);
            setPlayStatus(true);
        }
    };

    const seekSong = (e) => {
        if (!audioRef.current || !seekBg.current) return;
        
        const seekPosition = (e.nativeEvent.offsetX / seekBg.current.offsetWidth);
        const newTime = seekPosition * audioRef.current.duration;
        
        if (isFinite(newTime)) {
            audioRef.current.currentTime = newTime;
            seekBar.current.style.width = `${seekPosition * 100}%`;
        }
    };

    useEffect(() => {
        if (!audioRef.current) return;

        const audio = audioRef.current;

        const handleTimeUpdate = () => {
            if (!audio.duration) return;

            const currentTime = formatTime(audio.currentTime);
            const totalTime = formatTime(audio.duration);
            
            setTime({ currentTime, totalTime });

            if (seekBar.current) {
                const progress = (audio.currentTime / audio.duration) * 100;
                seekBar.current.style.width = `${progress}%`;
            }
        };

        const handleLoadedData = () => {
            setIsLoading(false);
            setAudioVolume(volume);
            if (playStatus) {
                play();
            }
        };

        const handleEnded = () => {
            if (track.id < songsData.length - 1) {
                next();
            } else {
                setPlayStatus(false);
            }
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadeddata', handleLoadedData);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadeddata', handleLoadedData);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [track, playStatus]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load();
        }
    }, [track.file]);

    const contextValue = {
        audioRef,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        next,
        previous,
        play,
        pause,
        playWithId,
        seekBar,
        seekBg,
        seekSong,
        time,
        volume,
        setVolume: setAudioVolume,
        isLoading
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;