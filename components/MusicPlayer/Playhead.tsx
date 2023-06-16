import React, { useEffect, useRef, useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import Marquee from '../Marquee';
import { FiSettings, FiInfo } from 'react-icons/fi';
import { useWindowSize } from "react-use";
import { Song as PlayheadSong } from '../xtypes'; // Import the Song type from xtypes


const TrackArt = styled.img`
  width: 40px;
  height: 40px;
  border-radius:6px;
  margin-top: 5px;
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
background-size: cover;
background-position: center;
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

const InfoIcon2 = styled.span`
  font-size: 16px;
  margin-right: 10px;
  color: ##e7e8e8;
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
  // z-index: 10000;
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
  padding: 24px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  // z-index: 100000;
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

const Artwork = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 0px;
  transition: transform 0.5s;
  box-shadow: 0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  border-radius: 6px;

&:hover {
  background-color: #ccc002;
  box-shadow: 0px 14px 28px rgba(0,0,0,0.25), 0px 10px 10px rgba(0,0,0,0.22);
}
`;

const Artwork2 = styled.img<{ isFullscreen: boolean; mouseX: number; mouseY: number }>`
  width: 90%;
  // height: 800px;
  border-radius: 0px;
  transition: transform 0.5s;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  transform: ${({ isFullscreen, mouseX, mouseY }) =>
    isFullscreen ? `translate(-${mouseX}px, -${mouseY}px)` : 'none'};

  &:hover {
    background-color: #ccc002;
    box-shadow: 0px 14px 28px rgba(0, 0, 0, 0.25), 0px 10px 10px rgba(0, 0, 0, 0.22);
  }
`;




const Title = styled.h3`
  color: #00000;
  margin-top: 0;
  font-size: 14px;
`;

const CardContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.390);

  background-color: #141a20;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  border: none; /* Add this line */
  transition: border 0.3s; /* Add this line */
  cursor: pointer;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  &:hover {
    box-shadow: 5px 5px 5px 0px rgba(0, 0, 1, 0.300);
  }
`;

const NftContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;
`;

const CreativeCreditsContainer = styled.div`
  display: row;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.390);

  background-color: #141a20;
  padding: 16px;
  align-items: center;
  gap: 2rem;
  border: none; /* Add this line */
  transition: border 0.3s; /* Add this line */
`;

const LeftDiv = styled.div`
  float: left;
`;

const RightDiv = styled.div`
  float: left;
  padding-left: 16px;
`;

const PercentageBox = styled.div`
  color: #e7e8e8;
  // text-align: center;
  font-size: 12px;
`;

const PercentageBox1 = styled.div`
  color: #141a20;
  // text-align: center;
  font-size: 12px;
`;

const ModalBackgroundImage = styled.img`
  position: absolute;
  width: 1000px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.1;
  z-index: -1;
`;

const FullscreenOverlay = styled.div<{ isFullscreen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: ${({ isFullscreen }) => (isFullscreen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;


interface PlayheadProps {
  currentSong: PlayheadSong | null;
  currentTime: number;
  duration: number;
  onProgressBarChange: (e: ChangeEvent<HTMLInputElement>) => void; // Updated type
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
  trackReleaseDate: string
  musicSongWriters: string
  lyricSongWriters: string
  vocalProducer: string
  recordProducer: string
  engineers: string
  mixing: string
  mastering: string
  label: string
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
  const [showControls, setShowControls] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  
  const handleArtworkClick = () => {
    setIsFullscreen(!isFullscreen);
  };

  const { width, height } = useWindowSize();

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

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouseX(event.clientX);
      setMouseY(event.clientY);
    };
  
    window.addEventListener('mousemove', handleMouseMove);
  
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const dx = (clientX - innerWidth / 2) / 20; // change the divisor for more/less sensitivity
      const dy = (clientY - innerHeight / 2) / 20; // change the divisor for more/less sensitivity

      setRotateX(dy);
      setRotateY(dx);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <PlayheadContainer >
        {currentSong && (
          <>
            <TrackArt src={currentSong.trackArt} alt="Artwork" />
            <TrackName>
              <Marquee text={`${currentSong.trackName}`} />
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
    {currentSong && (
      <ModalBackgroundImage src={currentSong.trackArt} alt="Background Artwork" />
    )}
    <Title>Song Info <InfoIcon2><FiInfo/></InfoIcon2></Title>
    <br/>
    <CloseButton onClick={closeModal}>&times;</CloseButton>
    {currentSong && (
      <>
        <FullscreenOverlay isFullscreen={isFullscreen}>
          {/* Content of the fullscreen overlay */}
          {currentSong && (
            <Artwork2
              src={currentSong.trackArt}
              alt="Fullscreen Artwork"
              onClick={handleArtworkClick}
            />
          )}
        </FullscreenOverlay>
        <div>
          <CardContainer>
            <NftContainer>
              <LeftDiv>
                <Artwork
                  src={currentSong.trackArt}
                  width="50px"
                  height="50px"
                  alt="Artwork"
                  onClick={handleArtworkClick}
                />
              </LeftDiv>
              <RightDiv>
                <Title>{currentSong.trackName}</Title>
                <PercentageBox>{currentSong.trackDuration}</PercentageBox>
                <PercentageBox>{currentSong.trackReleaseDate}</PercentageBox>
              </RightDiv>
            </NftContainer>
          </CardContainer>
          <br/>
          <CreativeCreditsContainer>
            <Title>CREATIVE TEAM</Title>
            <PercentageBox>Music Songwriters: {currentSong.musicSongWriters} </PercentageBox>
            <PercentageBox>Lyric Songwriters: {currentSong.lyricSongWriters}</PercentageBox>
            <PercentageBox>Vocal Producers: {currentSong.vocalProducer}</PercentageBox>
            <PercentageBox>Record Producers: {currentSong.recordProducer}</PercentageBox>
            <PercentageBox>Engineers: {currentSong.engineers}</PercentageBox>
            <PercentageBox>Mixing: {currentSong.mixing}</PercentageBox>
            <PercentageBox>Mastering: {currentSong.mastering}</PercentageBox>
            <PercentageBox>Label: {currentSong.label}</PercentageBox>
          </CreativeCreditsContainer>
        </div>
      </>
    )}
  </ModalContent>
</ModalOverlay>
    </>
  );
};

export default Playhead;
