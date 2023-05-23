import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Playhead from './Playhead';
import PlayerController from './PlayerController';
import SongList from './SongList';
import { Songs as MusicPlayerSong } from '../../components/xtypes';

interface Song {
  id: string;
  trackArt: string;
  trackName: string;
  trackDuration: string;
  url: string;
  artist: string;
}

// Styled components
const MusicPlayerContainer = styled.div`
  // text-align: center;
  margin: auto;
  max-width: 100%;
`;

const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  
`;

const ProgressBar = styled.input`
  width: 100%;
  margin: 0 8px;
`;

const MusicPlayer: React.FC = () => {
  // State variables
  const [currentSong, setCurrentSong] = useState<MusicPlayerSong | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSongId, setCurrentSongId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  // Render the music player UI
  return (
    <MusicPlayerContainer>
      <Playhead currentSong={currentSong} />
      <PlayerController play={play} pause={pause} previous={previous} next={next} isPlaying={isPlaying} />
      <SongList songs={songs} setCurrentSong={setCurrentSong} currentSongId={currentSongId} />
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
    </MusicPlayerContainer>
  );
};

export default MusicPlayer;
