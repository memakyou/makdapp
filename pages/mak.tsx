import { NextPage } from 'next'
import styled from 'styled-components';
import MshrsShowAll from '../components/MshrsShowAll';
import GetCore from '../components/GetCore';

const Container = styled.div`
  padding: 24px; 
`;

const Main = styled.main`
min-height: 100vh;
padding: 1rem 0; 
flex: 1;
display: flex;
flex-direction: column;
align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 14px;
  text-align: center;

  a {
    color: #ccc002;
    text-decoration: none;

    &:hover,
    &:focus,
    &:active {
      // text-decoration: underline;
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
    background-color: #7289da;
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
  justify-content: space-between;

  &:hover {
    box-shadow: 0px 14px 28px rgba(0,0,0,0.25), 0px 10px 10px rgba(0,0,0,0.22);

  }
`;
const TitleMain = styled.h1`
  margin-bottom: 20px;
  font-size: 16px;
  color: #e7e8e8;
  text-align: left;
`;

const Cost = styled.p`
font-size: 12px;
  color: #141a20;
  
`;

const Mak: NextPage = () => {
  return (
    <Container>
      <Main>
          <MshrsShowAll />
          <br/>

          <Card2>
            <GetCore />
          </Card2>
          <br/>

          <Card>
          <h3>GOT <a>$MAK?</a></h3>
          <Cost>Join us on discord to learn about <u>$MAK</u> bounties & rewards</Cost>
          </Card>
          <br/>
      </Main>
    </Container>
  );
};

export default Mak;
