import React, { useState } from 'react';
import Playhead from './Playhead';
// import Controls from './Controls';
// import Track from './TrackList';
import Controls, { Track } from './Controls';


const MusicPlayer = () => {
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  const handleTrackContainerClick = (track: Track) => {
    // Handle the click event for the track container
    console.log('Track container clicked:', track);
  };

  return (
    <>
      <Playhead />
      <Controls
        audioPlayer={audioPlayer}
        selectedTrack={selectedTrack}
        handleTrackContainerClick={handleTrackContainerClick} // Pass the correct function name here
      />
    </>
  );
};

export default MusicPlayer;
