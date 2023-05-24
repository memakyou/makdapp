import React, { useState } from 'react';
import styled from 'styled-components';
import { SongListSong } from '../xtypes';
import { RiPlayLine, RiInformationLine } from 'react-icons/ri';

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

  &:hover {
    .track-id {
      display: none;
    }

    .play-icon {
      display: flex;
    }
  }
`;

const TrackId = styled.div`
  margin-right: 1rem;
  color: #d4d4d4;

  /* Conditionally show/hide the play icon */
  display: flex;
  align-items: center;

  .play-icon {
    display: none;
    font-size: 20px;
    color: #ccc002;
    margin-right: 1rem;
  }
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

interface SongListProps {
  songs: SongListSong[];
  setCurrentSong: (song: SongListSong | null) => void;
  currentSongId: string | null;
  onSongClick: (song: SongListSong) => void; // Added onSongClick prop
}

const SongList: React.FC<SongListProps> = ({ songs, setCurrentSong, currentSongId, onSongClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleSongClick = (song: SongListSong) => {
    setCurrentSong(song);
    onSongClick(song); // Call the onSongClick prop with the clicked song
  };

  const handleInformationIconClick = (song: SongListSong) => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <Main>
        {songs.length > 0 ? (
          songs.map((song) => (
            <TrackListContainer key={song.id} onClick={() => handleSongClick(song)}>
              <TrackContainer>
                <TrackId>
                  <PlayIcon className="play-icon" />
                  <span className="track-id">{song.id}</span>
                </TrackId>
                <TrackArt src={song.trackArt} alt="Track Art" />
                <TrackName>{song.trackName}</TrackName>
                <TrackDuration>
                  {song.trackDuration}
                  {/* <IconContainer className="information-icon" onClick={() => handleInformationIconClick(song)}>
                    <InformationIcon />
                  </IconContainer> */}
                </TrackDuration>
              </TrackContainer>
            </TrackListContainer>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </Main>
    </Container>
  );
};

export default SongList;
