import { NextPage } from 'next';
import MshrsShowMine from '../components/MshrsShowMine';
import { useAddress, useContract, useTokenBalance } from '@thirdweb-dev/react';
import styled from 'styled-components';
import MyBdgs from '../components/MyBdgs';
import MyMakPay from '../components/MyMakPay';

const Container = styled.div`
  padding: 0 2rem;
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
  font-size: 1rem;
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
  padding: 10px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(.25, .8, .25, 1);

  &:hover {
    box-shadow: 0px 14px 28px rgba(0, 0, 0, 0.25), 0px 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const DefaultText = styled.p`
  color: #272c34;
  font-size: 10px;
`;

const SubTitle = styled.h2`
  color: #d4d4d4;
`;

const You: NextPage = () => {
  const address = useAddress();
  const tokenContractAddress = "0x37524Cf8f213C2EE089bbC9b95ECf1978BcFA2A7";
  const { contract: tokenContract } = useContract(tokenContractAddress, "token");

  const { data: tokenBalance } = useTokenBalance(tokenContract, address);

  const isConnected = Boolean(address);

  return (
    <Container>
      <Main>
        {isConnected ? (
          <>
            <Card>
              <DefaultText>
                ✅ You&apos;re connected to <a>MEMAKYOU</a> with <a>{address}</a>
              </DefaultText>
              {/* <p>
                You&apos;ve{' '}
                <a>
                  {tokenBalance?.displayValue} ${tokenBalance?.symbol}
                </a>{' '}
                in your connected wallet 👜
              </p> */}
            </Card>
            <br />
            <SubTitle>#MSHRS</SubTitle>
            {/* <MshrsShowMine /> */}
            <SubTitle>#BDGS</SubTitle>
            <MyBdgs />
            <MyMakPay />
            <p></p>
          </>
        ) : (
          <Card>
            <p>
              You&apos;re not connected.
              Please connect your wallet to see your items.
            </p>
          </Card>
        )}
      </Main>
    </Container>
  );
};

export default You;
