import React, { useState } from 'react';
import styled from 'styled-components';
import Marquee from '../Marquee';
import { FiSettings, FiInfo } from 'react-icons/fi';

const TrackArt = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 40px;
  margin-top: 0px;
`;

const TrackName = styled.div`
  color: #aaaaaa;
  flex: 1;

  &:hover {
    color: #ccc002;
  }
`;

const PlayheadContainer = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 24px;
  padding-right: 24px;
  position: relative;
`;

const ControlIcon = styled.span<{ showControls: boolean }>`
  font-size: 20px;
  // margin: 0 10px;
  cursor: pointer;
  color: ${({ showControls }) => (showControls ? '#ccc002' : '#333')};

  &:hover {
    color: #ccc002;
  }
`;

const InfoIcon = styled.span`
  font-size: 20px;
  margin-right: 10px;
  color: #aaa;

  &:hover {
    color: #ccc002;
  }
`;

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background: #d4d4d4;
  padding: 20px;
  width: 100%;
  overflow-y: auto;
  box-sizing: border-box;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
  color: #aaa;

  &:hover {
    color: #ccc002;
  }
`;

interface PlayheadProps {
  currentSong: Song | null;
  currentTime: number;
  duration: number;
  onProgressBarChange: (time: number) => void;
}

interface Song {
  id: string;
  trackArt: string;
  trackName: string;
  trackDuration: string;
  url: string;
  artist: string;
}

const Playhead: React.FC<PlayheadProps> = ({
  currentSong,
  currentTime,
  duration,
  onProgressBarChange,
}) => {
  const [showControls, setShowControls] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleListIconClick = () => {
    setShowControls(!showControls);
  };

  const handleInfoIconClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <PlayheadContainer>
        {currentSong && (
          <>
            <TrackArt src={currentSong.trackArt} alt="Artwork" />
            <TrackName>
            <Marquee text={`${currentSong.trackName} by ${currentSong.artist}`}></Marquee>
            </TrackName>
            <InfoIcon onClick={handleInfoIconClick}>
              <FiInfo />
            </InfoIcon>
            <ControlIcon showControls={showControls} onClick={handleListIconClick}>
              <FiSettings />
            </ControlIcon>
          </>
        )}
      </PlayheadContainer>

      <ModalOverlay isOpen={isModalOpen}>
        <ModalContent>
          <CloseButton onClick={closeModal}>&times;</CloseButton>
          <h2>Title</h2>
          <p>Content of the modal goes here.</p>
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default Playhead;
