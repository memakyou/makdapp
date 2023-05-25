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

const ControlIcon = styled.span<{ showControls: boolean; showTrackList: boolean }>`
  font-size: 20px;
  cursor: pointer;
  color: ${({ showControls, showTrackList }) => (showControls || showTrackList ? '#ccc002' : '#333')};

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
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 9999;
  background: linear-gradient(45deg, #ccc002, #333);
  background-size: 400% 400%;
  animation: gradientAnimation 10s ease-in-out infinite;
  
  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;


const ModalContent = styled.div`
  background: transparent;
  padding: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  showPlayerController: boolean;
  togglePlayerController: () => void;
  showTrackList: boolean;
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
  showPlayerController,
  togglePlayerController,
  showTrackList,
}) => {
  const [showControls, setShowControls] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleListIconClick = () => {
    setShowControls(!showControls);
    togglePlayerController();
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
              <Marquee text={`${currentSong.trackName} by ${currentSong.artist}`} />
            </TrackName>
            <InfoIcon onClick={handleInfoIconClick}>
              <FiInfo />
            </InfoIcon>
            <ControlIcon
              showControls={showControls}
              showTrackList={showTrackList}
              onClick={handleListIconClick}
            >
              <FiSettings />
            </ControlIcon>
          </>
        )}
      </PlayheadContainer>

      <ModalOverlay isOpen={isModalOpen}>
        <ModalContent>
          <CloseButton onClick={closeModal}>&times;</CloseButton>
          {currentSong && (
            <>
              <h2>{currentSong.trackName}</h2>
              {/* <img src={currentSong.trackArt} alt="Artwork" /> */}
              <p>Artist: {currentSong.artist}</p>
              <p>Duration: {currentSong.trackDuration}</p>
            </>
          )}
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default Playhead;
