// components/Marquee.tsx

import React from 'react';
import styled, { keyframes } from 'styled-components';

interface MarqueeProps {
  text: string;
}

const marqueeAnimation = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const MarqueeContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

const MarqueeWrapper = styled.div`
  display: inline-block;
  white-space: nowrap;
  animation: ${marqueeAnimation} 10s linear infinite;
  animation-delay: 1s;
`;

const MarqueeContent = styled.span`
  display: inline-block;
  white-space: nowrap;
`;

const Marquee: React.FC<MarqueeProps> = ({ text }) => {
  return (
    <MarqueeContainer>
      <MarqueeWrapper>
        <MarqueeContent>{text}</MarqueeContent>
      </MarqueeWrapper>
    </MarqueeContainer>
  );
};

export default Marquee;
