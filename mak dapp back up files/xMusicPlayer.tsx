import React, { useState } from 'react';
import Playhead from './xPlayhead';
import Controls from './xControls';
import TrackList, { Track } from './xTrackList'

const MusicPlayer = () => {
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const handleTrackContainerClick = (track: Track) => {
    // Handle the click event for the track container
    console.log('Track container clickeded:', track);
  };

  return (
    <>
      <Playhead />
      <Controls
        audioPlayer={audioPlayer}
        selectedTrack={selectedTrack}
        handleTrackContainerClick={handleTrackContainerClick} // Pass the correct function name here
        isPlaying={false}  
      />           
      
     </>
  );
};

export default MusicPlayer;
