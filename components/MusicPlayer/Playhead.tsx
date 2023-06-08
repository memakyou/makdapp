import React, { useEffect, useRef, useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import Marquee from '../Marquee';
import { FiSettings, FiInfo } from 'react-icons/fi';
import { useWindowSize } from "react-use";
import { Song as PlayheadSong } from '../xtypes'; // Import the Song type from xtypes


const TrackArt = styled.img`
  width: 40px;
  height: 40px;
  // border-radius:16px;
  border: #d4d4d4 solid 0.1px;
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
  padding: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
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
  width: 250px;
  height: 250px;
  border-radius: 0px;
  margin-top: 30px;

  transition: transform 0.5s;
  box-shadow: 0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);

&:hover {
  background-color: #ccc002;
  box-shadow: 0px 14px 28px rgba(0,0,0,0.25), 0px 10px 10px rgba(0,0,0,0.22);
}
`;

const Title = styled.h3`
  color: #00000;
  margin-top: 0;
  font-size: 14px;
`;

const CreditItems = styled.p`
  color: #555;
  font-weight: bold;
  // margin-bottom: 10px;
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
  const [showControls, setShowControls] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const dx = (clientX - innerWidth / 2) / 20; // change the divisor for more/less sensitivity
      const dy = (clientY - innerHeight / 2) / 20; // change the divisor for more/less sensitivity

      if(ref.current) {
        ref.current.style.transform = `perspective(1000px) rotateX(${dy}deg) rotateY(${dx}deg)`;
      }
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
          <Title>Song Info <InfoIcon2><FiInfo/></InfoIcon2></Title>
          <CloseButton onClick={closeModal}>&times;</CloseButton>
          {currentSong && (
            <>     
               {/* <Artwork src={currentSong.trackArt}  alt="Artwork" /> */}
              <div>
<br/><br/>
              <Title>{currentSong.trackName}</Title>
                <Title>{currentSong.artist}</Title>
                <Title>{currentSong.trackDuration}</Title>
                <Title>{currentSong.trackReleaseDate}</Title>
                <br></br>
                <CreditItems><b>CREATIVE TEAM</b></CreditItems>
                <Title>Music Songwriters:<br/>{currentSong.musicSongWriters}</Title>
                <Title>Lyric Songwriters: <br/> {currentSong.lyricSongWriters}</Title>
                <Title>Vocal Producers:<br/> {currentSong.vocalProducer}</Title>
                <Title>Record Producers:<br/> {currentSong.recordProducer}</Title>
                <Title>Engineers:<br/> {currentSong.engineers}</Title>
                <Title>Mixing:<br/> {currentSong.mixing}</Title>
                <Title>Mastering:<br/> {currentSong.mastering}</Title>
                <Title>Label:<br/>{currentSong.label}</Title>
                <br></br>
            </div>
            </>
          )}
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default Playhead;
