import { NextPage } from 'next';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw; /* Set the container width to the full viewport width */
  height: 100vh; /* Set the container height to the full viewport height */
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IframeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const CorePay: NextPage = () => {
  return (
    <Container>
      <Main>
        <IframeContainer>
          <iframe src="https://v1.flair.dev/public/claim/5/0xe7065c7c969f4cbe7cad83a37e2dc36bc3930bfb" frameBorder="none" style={{ width: '100%', height: '100%' }} />
        </IframeContainer>
      </Main>
    </Container>
  );
};

export default CorePay;
