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
        // sdkOptions={{
        //   gasless: {
        //     openzeppelin: {
        //       relayerUrl: "https://api.defender.openzeppelin.com/autotasks/836222cc-9374-44c5-bb16-801c0bf68134/runs/webhook/3a0f9a9c-74c5-487b-8f79-11c88544824e/6G8qPnvdiHn8RSnL4TY8ys",
        //   }
        // }
        // }}
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
