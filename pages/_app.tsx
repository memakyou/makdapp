import type { AppProps } from "next/app";
import { ThirdwebProvider, localWallet, magicLink, metamaskWallet, paperWallet, walletConnect } from "@thirdweb-dev/react";
import "../styles/globals.css";
import React, { useEffect, useState, useRef } from 'react';
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import MusicPlayer from "../components/MusicPlayer/MusicPlayer";

const activeChain = "goerli";

export function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThirdwebProvider 
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
          localWallet({persist: true}),
        ]}
      >
        <Header />
        <Nav />
        <MusicPlayer />
        <Component {...pageProps} />
        <Footer />
      </ThirdwebProvider>

    </>
  );
}
  
  export default MyApp;
  