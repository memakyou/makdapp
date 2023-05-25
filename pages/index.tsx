// index.tsx
import type { NextPage } from "next";
import styled from 'styled-components';
import SocialMediaLinks from "../components/SocialLinkBar";

// Define your styled components here
const Container = styled.div`
  padding: 0 2rem;
`;

const Main = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  width: 100%;
  background-color: #878787;
  padding: 16px;
  box-shadow: 0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  
  &:hover {
    background-color: #ccc002;
    box-shadow: 0px 14px 28px rgba(0,0,0,0.25), 0px 10px 10px rgba(0,0,0,0.22);
    cursor: pointer;

  }
`;

const Card2 = styled.div`
  width: 100%;
  background-color: #878787;
  padding: 16px;
  box-shadow: 0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  
  &:hover {
    box-shadow: 0px 14px 28px rgba(0,0,0,0.25), 0px 10px 10px rgba(0,0,0,0.22);
    cursor: pointer;
  }
`;

const Home: NextPage = () => {
  const openNewTab = (url: string) => {
    window.open(url, "_blank");
  };


  return (
    <Container>
      <Main>
        <div>
          <SocialMediaLinks />
          <Card onClick={() => openNewTab("https://twitter.com")}>
            <h1>VISIT MAKWRLD 🌎</h1><p>Come get lost in the magical world of creation</p>
          </Card>
          <br/>
          <Card>
            <h1>ART IS A HORSE 🎥</h1><p>A short film that explains nothing</p>
          </Card>
          <br/>
          <Card onClick={() => openNewTab("https://docs.google.com/forms/d/e/1FAIpQLSdr0fgkl-tu1NZbiFGB1sDTxMrz3m8YcqO7tBwz9hYrvWjsug/viewform")}>
            <h1>HILLTOP BASH 🎟️ ✈️ 🇮🇪</h1><p>Claim your interest</p>
          </Card>
        </div>
      </Main>
    </Container>
  );
};

export default Home;
