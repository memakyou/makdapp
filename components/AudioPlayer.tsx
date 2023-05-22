import React, { useState, useEffect } from 'react';

interface Track {
  id: string;
  trackArt: string;
  trackName: string;
  trackDuration: string;
  url: string;
  artist: string;
}

interface AudioPlayerProps {
  children: React.ReactNode;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ children }) => {
    const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);
    const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  
    const handleTrackContainerClick = (track: Track) => {
      if (audioPlayer) {
        if (selectedTrack === track) {
          if (audioPlayer.paused) {
            audioPlayer.play();
            console.log('Audio resumed');
          } else {
            audioPlayer.pause();
            console.log('Audio paused');
          }
        } else {
          audioPlayer.pause();
          const newAudioPlayer = new Audio(track.url);
          setAudioPlayer(newAudioPlayer);
          console.log('New audio player set:', newAudioPlayer);
          newAudioPlayer.play();
          setSelectedTrack(track);
          console.log('Audio played:', track.url);
        }
      } else {
        const newAudioPlayer = new Audio(track.url);
        setAudioPlayer(newAudioPlayer);
        console.log('New audio player set:', newAudioPlayer);
        newAudioPlayer.play();
        setSelectedTrack(track);
        console.log('Audio played:', track.url);
    }
    };
  
    useEffect(() => {
      console.log('Audio player:', audioPlayer);
    }, [audioPlayer]);
  
    useEffect(() => {
      console.log('Selected track:', selectedTrack);
    }, [selectedTrack]);
  
    return (
      <>
        {React.Children.map(children, (child) =>
          React.cloneElement(child as React.ReactElement, {
            audioPlayer,
            selectedTrack,
            onTrackContainerClick: handleTrackContainerClick,
          })
        )}
      </>
    );
  };
  

export default AudioPlayer;
