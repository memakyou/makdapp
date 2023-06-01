import React, { useState } from 'react';
import styled from 'styled-components';
import { RiPlayLine, RiPauseLine } from 'react-icons/ri';
import { MdSkipPrevious, MdSkipNext } from 'react-icons/md';
import { FaList } from 'react-icons/fa';

const ControlsContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ControlIcon = styled.span`
  font-size: 30px;
  margin: 0 10px;
  cursor: pointer;
  padding-bottom: 10px;
  color: white;

  &:hover {
    color: #ccc002;
  }
`;

const ListIcon = styled.span<{ isActive: boolean }>`
  font-size: 20px;
  margin: 0 10px;
  cursor: pointer;
  padding-bottom: 11px;
  color: ${({ isActive }) => (isActive ? '#ccc002' : '#333')};

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
  showTrackList: boolean; // Add showTrackList prop
}

const PlayerController: React.FC<PlayerControllerProps> = ({
  play,
  pause,
  previous,
  next,
  isPlaying,
  onListIconClick,
  showTrackList,
}) => {
  const [isActive, setIsActive] = useState(showTrackList);

  const handleListIconClick = () => {
    setIsActive((prev) => !prev);
    onListIconClick();
  };

  return (
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
      <ListIcon isActive={isActive} onClick={handleListIconClick}>
        <FaList />
      </ListIcon>
    </ControlsContainer>
  );
};

export default PlayerController;
