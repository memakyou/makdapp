import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RiPlayLine, RiInformationLine } from 'react-icons/ri';

// type Track = {
//   id: string;
//   trackArt: string;
//   trackName: string;
//   trackDuration: string;
//   url: string;
//   artist: string;
// };

export interface Track {
    id: string;
    trackArt: string;
    trackName: string;
    trackDuration: string;
    url: string;
    artist: string;
  }
  



type TrackListProps = {
  audioPlayer: HTMLAudioElement | null;
  selectedTrack: Track | null;
  onTrackContainerClick: (track: Track) => void;
};

const Container = styled.div`
  // padding: 0 2rem;
`;

const Main = styled.main`
  padding: 1rem 0;
  display: flex;
  flex-wrap: wrap;
`;

const TrackListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: none;
  transition: border 0.3s;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.9);
    background-color: #0f1318;

    .information-icon {
      opacity: 1;
    }
  }
`;

const TrackArt = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 6px;
`;

const TrackContainer = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 16px;
  position: relative;
  cursor: pointer; /* Add cursor pointer for the clickable effect */
`;

const TrackId = styled.div<{ isHovered: boolean }>`
  margin-right: 1rem;
  color: #d4d4d4;

  /* Conditionally show/hide the play icon */
  ${({ isHovered }) => isHovered && 'display: none;'}
`;

const TrackName = styled.div`
  color: #d4d4d4;
  flex: 1;
  margin-left: 1rem;
`;

const TrackDuration = styled.div`
  margin-left: auto;
  color: #d4d4d4;
  padding-right: 26px;
  display: flex;
  align-items: center;

  .information-icon {
    opacity: 0;
    transition: opacity 0.3s;
  }
`;

const IconContainer = styled.span`
  margin-right: 0.5rem;
  padding-left: 26px;
  position: relative;
`;

const PlayIcon = styled(RiPlayLine)`
  font-size: 20px;
  color: #ccc002;
  margin-right: 1rem;
`;

const InformationIcon = styled(RiInformationLine)`
  font-size: 20px;
  color: #d4d4d4;

  &:hover {
    color: #ccc002;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vh;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: #d4d4d4;
  padding: 20px;
  width: 100vh;
  height: 100%;
  align-items: center;

  box-sizing: border-box;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;

  &:hover {
    color: #ccc002;
  }
`;

const ModalTrackName = styled.div`
  color: #0f1318;
  flex: 1;
`; 

const TrackArtModal = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 6px;
`;

const TrackList: React.FC<TrackListProps> = ({
  audioPlayer,
  selectedTrack,
  onTrackContainerClick,
}) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredTrackId, setHoveredTrackId] = useState('');

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch('/tracks.json');
        if (!response.ok) {
          throw new Error('Failed to fetch tracks');
        }
        const data = await response.json();
        setTracks(data);
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    };

    fetchTracks();
  }, []);

  const handleInformationIconClick = (track: Track) => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTrackContainerMouseEnter = (trackId: string) => {
    setHoveredTrackId(trackId);
  };

  const handleTrackContainerMouseLeave = () => {
    setHoveredTrackId('');
  };

  const handleTrackContainerClick = (track: Track) => {
    onTrackContainerClick(track);
    console.log('Track container clicked:', track);

  };

  useEffect(() => {
    if (audioPlayer) {
      audioPlayer.addEventListener('ended', handleAudioEnded);
      return () => {
        audioPlayer.removeEventListener('ended', handleAudioEnded);
      };
    }
  }, [audioPlayer]);

  const handleAudioEnded = () => {
    if (audioPlayer) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
      handleNoTrackSelected(); // Call a separate function for no track selected
    }
  };
  
  const handleNoTrackSelected = () => {
    // Handle the case when no track is selected
    console.log('No track selected');
  };
  
  return (
    <Container>
      <Main>
        {tracks.length > 0 ? (
          tracks.map((track) => (
            <TrackListContainer
              key={track.id}
              onMouseEnter={() => handleTrackContainerMouseEnter(track.id)}
              onMouseLeave={handleTrackContainerMouseLeave}
              onClick={() => handleTrackContainerClick(track)}
            >
            <TrackContainer>
                <TrackId isHovered={hoveredTrackId === track.id}>
                  {track.id}
                </TrackId>
                {selectedTrack !== null && selectedTrack === track && audioPlayer !== null && !audioPlayer.paused && <PlayIcon />}
                <TrackArt src={track.trackArt} alt="Track Art" />
                <TrackName>{track.trackName}</TrackName>
                <TrackDuration>
                  {track.trackDuration}
                  <IconContainer
                    className="information-icon"
                    onClick={() => handleInformationIconClick(track)}
                  >
                    <InformationIcon />
                  </IconContainer>
                </TrackDuration>
              </TrackContainer>
            </TrackListContainer>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </Main>
      {selectedTrack && isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={closeModal}>X</CloseButton>
            <div>
              <TrackArtModal src={selectedTrack.trackArt} alt="Track Art" />

              <ModalTrackName>{selectedTrack.trackName}</ModalTrackName>
              <ModalTrackName>{selectedTrack.artist}</ModalTrackName>
              <p></p>
              <ModalTrackName>
                <b>ABOUT THE TRACK</b>{' '}
              </ModalTrackName>
              <ModalTrackName>
                This is a brief bio offering unique context/ information for the
                selected song.
              </ModalTrackName>
              <p></p>
              <ModalTrackName>
                Duration: {selectedTrack.trackDuration}
              </ModalTrackName>
              <ModalTrackName>Released: </ModalTrackName>
              <p></p>

              <ModalTrackName>
                <b>CREATIVE TEAM</b>{' '}
              </ModalTrackName>
              <ModalTrackName>Music Songwriters: </ModalTrackName>
              <ModalTrackName>Lyric Songwriters: </ModalTrackName>
              <ModalTrackName>Vocal Producers: </ModalTrackName>

              <ModalTrackName>Record Producers: </ModalTrackName>
              <ModalTrackName>Engineers:</ModalTrackName>
              <ModalTrackName>Mixing: </ModalTrackName>
              <ModalTrackName>Mastering: </ModalTrackName>
              <ModalTrackName>Label: </ModalTrackName>
              <ModalTrackName>A&R: </ModalTrackName>

              <p></p>
              <ModalTrackName>
                <b>STUDIO SPEC</b>{' '}
              </ModalTrackName>
              <ModalTrackName>DAW: </ModalTrackName>
              <ModalTrackName>Processing: </ModalTrackName>
              <ModalTrackName>Microphones:</ModalTrackName>

              <p></p>
              <ModalTrackName>
                <b>SPECIAL THANKS</b>{' '}
              </ModalTrackName>
              {/* Include other track information here */}
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default TrackList;
