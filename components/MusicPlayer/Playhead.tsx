import React from 'react';
import styled from 'styled-components';
import Marquee from '../Marquee';
// const Container = styled.div`
//   // padding: 0 2rem;
// `;

// const Main = styled.main`
//   // padding: 1rem 0;
//   display: flex;
//   flex-wrap: wrap;
// `;

const TrackArt = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 40px;
`;

const TrackName = styled.div`
  color: #ccc002;
  flex: 1;
  // margin-left: 0rem;
`;

const PlayheadContainer = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 24px;
  position: relative;
  // cursor: pointer; /* Add cursor pointer for the clickable effect */
`;

interface PlayheadProps {
  currentSong: Song | null;
}

interface Song {
    id: string;
    trackArt: string;
    trackName: string;
    trackDuration: string;
    url: string;
    artist: string;
  }

const Playhead: React.FC<PlayheadProps> = ({ currentSong }) => {
  return (
   
        <PlayheadContainer>
          {currentSong && (
            <>
              <TrackArt src={currentSong.trackArt} alt="Artwork" />
              <Marquee text={currentSong.trackName}></Marquee>
            </>
          )}
        </PlayheadContainer>
       
  );
};

export default Playhead;
