import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Playhead from './Playhead';
import PlayerController from './PlayerController';
import SongList from './SongList';
import { SongListSong, Song as SongInterface } from '../xtypes';


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

interface Song extends Omit<SongListSong, 'musicSongWriters' | 'lyricSongWriters'> {
  trackReleaseDate: string;
  musicSongWriters: string[];
  lyricSongWriters: string[];
  vocalProducer: string;
  // Add any additional properties from the 'Song' type here
}


const MusicPlayer: React.FC<MusicPlayerProps> = ({ isOpen }) => {
  const [currentSong, setCurrentSong] = useState<SongListSong | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSongId, setCurrentSongId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showPlayerController, setShowPlayerController] = useState(true);
  const [showSongList, setShowSongList] = useState(false);
  const [showTrackList, setShowTrackList] = useState(false);

  useEffect(() => {
    fetch('/songs.json')
      .then((response) => response.json())
      .then((data) => {
        setSongs(data);
        setCurrentSong(data[0]);
        setCurrentSongId(data[0].id);
      });
  }, []);

  const handleListIconClick = () => {
    setShowTrackList(!showTrackList);
  };

  const toggleTrackList = () => {
    setShowTrackList((prev) => !prev);
  };

  const togglePlayerController = () => {
    if (showTrackList) {
      setShowTrackList(false);
    } else {
      setShowPlayerController((prev) => !prev);
    }
  };

  const play = () => {
    if (currentSong && audioRef.current) {
      if (!isPlaying) {
        audioRef.current.play();
      }
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (currentSong && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

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

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    setCurrentTime(e.currentTarget.currentTime);
  };

  const handleDurationChange = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    setDuration(e.currentTarget.duration);
  };

  const handleProgressBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    setCurrentTime(time);
  };

  const handleSongClick = (song: SongInterface) => {
    const extendedSong: SongInterface = {
      ...song,
      trackReleaseDate: '',
      musicSongWriters: [],
      lyricSongWriters: [],
      vocalProducer: '',
    };
  
    setCurrentSong(extendedSong);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = song.url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleSongList = () => {
    setShowSongList(!showSongList);
  };

  return (
    <MusicPlayerContainer>
      {isOpen && (
        <>
          <Playhead
            currentSong={currentSong}
            currentTime={currentTime}
            duration={duration}
            onProgressBarChange={handleProgressBarChange}
            showPlayerController={showPlayerController}
            togglePlayerController={togglePlayerController} showTrackList={false}          />
          {showPlayerController && (
            <PlayerController
              play={play}
              pause={pause}
              previous={previous}
              next={next}
              isPlaying={isPlaying}
              onListIconClick={toggleSongList}
              showTrackList={showTrackList}
            />
          )}
          {showSongList && (
            <SongList
              songs={songs}
              setCurrentSong={setCurrentSong}
              currentSongId={currentSongId}
              onSongClick={handleSongClick}
              showSongList={showSongList}
            />
          )}
          {currentSong && (
            <>
              <audio
                ref={audioRef}
                src={currentSong.url}
                onTimeUpdate={handleTimeUpdate}
                onDurationChange={handleDurationChange}
              />
              <ProgressBarContainer>
                <ProgressBar
                  type="range"
                  min={0}
                  max={duration}
                  value={currentTime}
                  onChange={handleProgressBarChange}
                />
              </ProgressBarContainer>
            </>
          )}
        </>
      )}
    </MusicPlayerContainer>
  );
};

export default MusicPlayer;
