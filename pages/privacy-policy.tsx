import { NextPage } from 'next';
import styled from 'styled-components';
import { useAddress } from '@thirdweb-dev/react';
import { useState } from 'react';

const Container = styled.div`
  padding: 0 2rem;
`;

const Main = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const Title = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 16px;
  text-align: center;

  a {
    color: #ccc002;
    text-decoration: none;

    &:hover,
    &:focus,
    &:active {
      text-decoration: underline;
    }
  }
`;

const PrivacyPolicy: NextPage = () => {
  const address = useAddress();

  return (
    <p>Privacy Policy</p>
  );
};

export default PrivacyPolicy;
