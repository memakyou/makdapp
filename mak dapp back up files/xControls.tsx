import React, { useState } from 'react';
import styled from 'styled-components';
import { RiPlayLine, RiPauseLine } from 'react-icons/ri';
import { MdSkipPrevious, MdSkipNext } from 'react-icons/md';
import { FaVolumeUp, FaList } from 'react-icons/fa';
import TrackList, { Track } from './xTrackList';
 
const ControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ControlIcon = styled.span`
  font-size: 30px;
  margin: 0 10px;
  cursor: pointer;
  padding-bottom: 10px


  &:hover {
    color: #ccc002;
  }
`;

const VolumeSlider = styled.input`
  display: ${({ visible }: { visible: boolean }) => (visible ? 'block' : 'none')};
  width: 80%;
  margin: auto;
  appearance: none;
  /* Styling for the track of the volume slider */
  &::-webkit-slider-runnable-track {
    width: 300px;
    height: 5px;
    background: #d4d4d4;
    border: none;
    border-radius: 3px;
    
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

const VolIcon = styled.span<{ showVolumeSlider: boolean }>`
  font-size: 20px;
  margin: 0 10px;
  cursor: pointer;
  color: ${({ showVolumeSlider }) => (showVolumeSlider ? '#ccc002' : '#333')};

  &:hover {
    color: #ccc002;
  }
`;

const ListIcon = styled.span<{ showTrackList: boolean }>`
  font-size: 20px;
  margin: 0 10px;
  cursor: pointer;
  color: ${({ showTrackList }) => (showTrackList ? '#ccc002' : '#333')};

  &:hover {
    color: #ccc002;
  }
`;

type ControlsProps = {
  isPlaying: boolean;
  audioPlayer: HTMLAudioElement | null;
  selectedTrack: Track | null;
  handleTrackContainerClick: (track: Track) => void;
};


const Controls: React.FC<ControlsProps> = ({ audioPlayer, selectedTrack, handleTrackContainerClick }) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showTrackList, setShowTrackList] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // New state for play/pause

  const handleVolumeIconClick = () => {
    setShowVolumeSlider(!showVolumeSlider);
  };

  const handleListIconClick = () => {
    setShowTrackList(!showTrackList);
  };

  const handlePlayPauseClick = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  return (
    <>
      <ControlsContainer>
        <ControlIcon>
          <MdSkipPrevious />
        </ControlIcon>
        <ControlIcon onClick={handlePlayPauseClick}>
          {isPlaying ? <RiPauseLine /> : <RiPlayLine />}
        </ControlIcon>
        <ControlIcon>
          <MdSkipNext />
        </ControlIcon>
        <VolIcon showVolumeSlider={showVolumeSlider}>
          <FaVolumeUp onClick={handleVolumeIconClick} />
        </VolIcon>
        <ListIcon showTrackList={showTrackList} onClick={handleListIconClick}>
          <FaList />
        </ListIcon>
      </ControlsContainer>
      <VolumeSlider
        type="range"
        min="0"
        max="100"
        step="1"
        visible={showVolumeSlider}
      />
      {showTrackList && <TrackList
      audioPlayer={audioPlayer}
      selectedTrack={selectedTrack}
      onTrackContainerClick={handleTrackContainerClick} // Make sure you pass the correct function here
    />}
    </>
  );
};

export default Controls;
