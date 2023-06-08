import React, { useState } from 'react';
import styled from 'styled-components';
import { RiPlayLine } from 'react-icons/ri';
import { SongListSong, Song } from '../xtypes';

const Container = styled.div`
  // padding: 0 2rem;
`;

const Main = styled.main`
  padding: 1rem 0;
  display: flex;
  flex-wrap: wrap;
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

const TrackArt = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 6px;
`;

const TrackName = styled.div`
  color: #d4d4d4;
  flex: 1;
  margin-left: 1rem;
`;

const TrackDuration = styled.div`
  margin-left: auto;
  color: #d4d4d4;
  padding-right: 10px;
  display: flex;
  align-items: center;
`;

const PlayIcon = styled(RiPlayLine)`
  font-size: 20px;
  color: #ccc002;
  margin-right: 1rem;
`;

interface SongListProps {
  songs: Song[];
  setCurrentSong: React.Dispatch<React.SetStateAction<Song | null>>;
  currentSongId: string | null;
  onSongClick: (song: Song) => void;
  showSongList: boolean;
}

const SongList: React.FC<SongListProps> = ({
  songs,
  setCurrentSong,
  currentSongId,
  onSongClick,
  showSongList,
}) => {
  const handleSongClick = (song: Song) => {
    setCurrentSong(song);
    onSongClick(song);
  };

  return (
    <Container>
      {showSongList && (
        <Main>
          {songs.length > 0 ? (
            songs.map((song) => (
              <TrackContainer key={song.id} onClick={() => handleSongClick(song)}>
                <TrackId>
                  <PlayIcon className="play-icon" />
                  <span className="track-id">{song.id}</span>
                </TrackId>
                <TrackArt src={song.trackArt} alt="Track Art" />
                <TrackName>{song.trackName}</TrackName>
                <TrackDuration>{song.trackDuration}</TrackDuration>
              </TrackContainer>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </Main>
      )}
    </Container>
  );
};

export default SongList;