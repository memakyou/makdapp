import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Playhead from './Playhead';
import PlayerController from './PlayerController';
import SongList from './SongList';
import { SongListSong } from '../xtypes';

// Styled components
const MusicPlayerContainer = styled.div`
  margin: auto;
  max-width: 100%;
  background-color: #141a20;
  position: sticky;
  top: 0;
`;

const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  width: 100%;
  background-color: #d4d4d4;
`;

const ProgressBar = styled.input`
  width: 100%;
  margin: auto;
  appearance: none;

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    background: #333;
    border: none;
    border-radius: 0;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 16px;
    width: 16px;
    border-radius: 0%;
    background: #ccc002;
    margin-top: -4px;
  }
`;

interface MusicPlayerProps {
  isOpen: boolean;
  onToggle: () => void;
  
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ isOpen }) => {
  // State variables
  const [currentSong, setCurrentSong] = useState<SongListSong | null>(null);
  const [songs, setSongs] = useState<SongListSong[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSongId, setCurrentSongId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showPlayerController, setShowPlayerController] = useState(true);
  const [showSongList, setShowSongList] = useState(false);

  // Fetch songs data on component mount
  useEffect(() => {
    fetch('/songs.json')
      .then((response) => response.json())
      .then((data) => {
        setSongs(data);
        setCurrentSong(data[0]);
        setCurrentSongId(data[0].id);
      });
  }, []);

  // Play the current song
  const play = () => {
    if (currentSong && audioRef.current) {
      // If the play button was not previously clicked, start playing the audio
      if (!isPlaying) {
        audioRef.current.play();
      }
      setIsPlaying(true);
    }
  };

  // Pause the current song
  const pause = () => {
    if (currentSong && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Play the previous song
  const previous = () => {
    if (currentSong) {
      const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
      const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
      setCurrentSong(songs[previousIndex]);
      setCurrentSongId(songs[previousIndex].id);
      if (isPlaying) {
        play();
      }
    }
  };

  // Play the next song
  const next = () => {
    if (currentSong) {
      const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
      const nextIndex = (currentIndex + 1) % songs.length;
      setCurrentSong(songs[nextIndex]);
      setCurrentSongId(songs[nextIndex].id);
      if (isPlaying) {
        play();
      }
    }
  };

  // Add 'ended' event listener to the audio element to autoplay the next song
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', next);
      return () => {
        audioRef.current?.removeEventListener('ended', next);
      };
    }
  }, [currentSong]);

  // Handle time update event of the audio element
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    setCurrentTime(e.currentTarget.currentTime);
  };

  // Handle duration change event of the audio element
  const handleDurationChange = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    setDuration(e.currentTarget.duration);
  };

  // Handle progress bar change event
  const handleProgressBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    setCurrentTime(time);
  };

  // Handle song click
  const handleSongClick = (song: SongListSong) => {
    setCurrentSong(song);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = song.url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Toggle player controller visibility
  const togglePlayerController = () => {
    setShowPlayerController(!showPlayerController);
  };


  // Toggle song list visibility
  const toggleSongList = () => {
    setShowSongList(!showSongList);
  };

  // Render the music player UI
  return (
    <MusicPlayerContainer>
      {isOpen && (
        <>
          <Playhead currentSong={currentSong} currentTime={currentTime} duration={duration} onProgressBarChange={handleProgressBarChange} />
          {showPlayerController && (
            <PlayerController
            play={play}
            pause={pause}
            previous={previous}
            next={next}
            isPlaying={isPlaying}
            onListIconClick={toggleSongList}
            onSettingsIconClick={togglePlayerController} // Add this line
          />
          )}
          {showSongList && <SongList songs={songs} setCurrentSong={setCurrentSong} currentSongId={currentSongId} onSongClick={handleSongClick} />}
          {currentSong && (
            <>
              <audio
                ref={audioRef}
                src={currentSong.url}
                onTimeUpdate={handleTimeUpdate}
                onDurationChange={handleDurationChange}
              />
              <ProgressBarContainer>
                <ProgressBar type="range" min={0} max={duration} value={currentTime} onChange={handleProgressBarChange} />
              </ProgressBarContainer>
            </>
          )}
        </>
      )}
    </MusicPlayerContainer>
  );
};

export default MusicPlayer;
