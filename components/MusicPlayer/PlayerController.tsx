import React, { useState } from 'react';
import styled from 'styled-components';
import { RiPlayLine, RiPauseLine } from 'react-icons/ri';
import { MdSkipPrevious, MdSkipNext } from 'react-icons/md';
import { FaList } from 'react-icons/fa';

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

const ListIcon = styled.span<{ showTrackList: boolean }>`
  font-size: 20px;
  margin: 0 10px;
  cursor: pointer;
  color: ${({ showTrackList }) => (showTrackList ? '#ccc002' : '#333')};

  &:hover {
    color: #ccc002;
  }
`;
interface PlayerControllerProps {
  play: () => void;
  pause: () => void;
  previous: () => void;
  next: () => void;
  isPlaying: boolean;
  onListIconClick: () => void;
  onSettingsIconClick: () => void;
}

const PlayerController: React.FC<PlayerControllerProps> = ({
  play,
  pause,
  previous,
  next,
  isPlaying,
  onListIconClick,
  onSettingsIconClick,
}) => {  const [showTrackList, setShowTrackList] = useState(false);

  const handleListIconClick = () => {
    setShowTrackList(!showTrackList);
  };


  return (
    <>
    <ControlsContainer>
      <ControlIcon onClick={previous}>
        <MdSkipPrevious />
      </ControlIcon>
      {isPlaying ? (
        <ControlIcon onClick={pause}>
          <RiPauseLine />
        </ControlIcon>
      ) : (
        <ControlIcon onClick={play}>
          <RiPlayLine />
        </ControlIcon>
      )}
      <ControlIcon onClick={next}>
        <MdSkipNext />
      </ControlIcon>
      <ListIcon showTrackList={showTrackList} onClick={handleListIconClick}>
        <FaList />
      </ListIcon>
    </ControlsContainer>
  </>
  );
};

export default PlayerController;