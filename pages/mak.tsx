import { NextPage } from 'next'
import styled from 'styled-components';
import MshrsShowAll from '../components/MshrsShowAll';
import GetCore from '../components/GetCore';

const Container = styled.div`
  padding: 0 2rem; 
`;

const Main = styled.main`
  min-height: 100vh;
  // padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
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

  }
`;

const Mak: NextPage = () => {
  return (
    <Container>
      <Main>
        <Title>
          MAK
          <a href="#">FACTORY</a>
        </Title>
          <h2>MUSIC SHARES <a>$MSHRS</a></h2>
          <MshrsShowAll />
          <br/>

          <Card2>
            <GetCore />
          </Card2>
          <br/>

          <Card>
          <h2>GOT $MAK?</h2>
          <p>Trade nostagia for $MAK, how old skool are you?</p>
          </Card>
          <br/>

      </Main>
    </Container>
  );
};

export default Mak;
