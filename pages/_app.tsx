// _app.tsx
import type { AppProps } from "next/app";
import { ThirdwebProvider, localWallet, magicLink, metamaskWallet, paperWallet, walletConnect } from "@thirdweb-dev/react";
import "../styles/globals.css";
import React, { useState, useRef } from 'react';
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import MusicPlayer from "../components/MusicPlayer/MusicPlayer";
import styled from "styled-components";

const activeChain = "goerli";

const MusicPlayerBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 16px;
  background-color: #ccc002;
  border-style: none;
  


  &:hover {
    background-color: #eee002;
    cursor: pointer; /* Add cursor pointer for the clickable effect */
    box-shadow: 0px 4px 8px rgba(0,0,0,0.2), 0px 2px 4px rgba(0,0,0,0.12);
  }
`;



export function MyApp({ Component, pageProps }: AppProps) {
  const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(false);

  const handleMusicPlayerToggle = () => {
    setIsMusicPlayerOpen(prevState => !prevState);
  };

  const handleOpenMusicPlayer = () => {
    setIsMusicPlayerOpen(true);
  };

  return (
    <>
      <ThirdwebProvider
        sdkOptions={{
          gasless: {
            openzeppelin: {
              relayerUrl: process.env.NEXT_PUBLIC_OPENZEPPELIN_URL,
          }
        }
        }}
        activeChain={activeChain}
        supportedWallets={[
          paperWallet({
            clientId: "74c196e0-fe85-46d4-8bf2-87b5b9b01fba"
          }),
          magicLink({
            apiKey: "pk_live_30D40A0579ABBD0E"
          }),
          metamaskWallet(),
          walletConnect(),
          localWallet({ persist: true }),
        ]}
      >
        <Header />
        <Nav />
        {!isMusicPlayerOpen && <MusicPlayerBtn onClick={handleOpenMusicPlayer}>Open Music Player</MusicPlayerBtn>}
        {isMusicPlayerOpen && <MusicPlayer isOpen={isMusicPlayerOpen} onToggle={handleMusicPlayerToggle} />}
        <Component {...pageProps} />
        <Footer />
      </ThirdwebProvider>
    </>
  );
}

export default MyApp;
