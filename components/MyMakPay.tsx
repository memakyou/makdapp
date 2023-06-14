import { ThirdwebNftMedia, useAddress, useContract, useOwnedNFTs, useClaimNFT, Web3Button } from '@thirdweb-dev/react'
import styled from 'styled-components'
import { useState } from 'react'
import GetCore from './GetCore';

// Define your styled components

const Container = styled.div`
  padding: 0 2rem;
  width: 100%;
`;

const Main = styled.main`
  padding: 1rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center; 
  
`;

const StyledThirdwebNftMedia = styled(ThirdwebNftMedia)`
  transition: transform 0.5s;
  box-shadow: 0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);

&:hover {
  background-color: #ccc002;
  box-shadow: 0px 14px 28px rgba(0,0,0,0.25), 0px 10px 10px rgba(0,0,0,0.22);
}
`;

const DefaultText = styled.p`
  color: #272c34;
  margin: auto;
  text-align: center;
  padding-top: 20px;
  padding-bottom:20px;
`;

const SubTitle = styled.h2`
  color: #d4d4d4
`;





const MyMakPay: React.FC = () => {

  const { contract } = useContract("0xBBC9956157e7cb58404F1B02cEaE029971aB6bbe");
  const address = useAddress()  
  const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(contract, address);
  
// Check if user has ownedNFTs
  const hasOwnedNFTs = Boolean(ownedNFTs?.length);
  const [selectedNFT, setSelectedNFT] = useState(null);

  return (
    <Container>
      <Main>
      <DefaultText><h1>😔</h1> You do not own a CORE token</DefaultText>
      <button>GET CORE</button>
      </Main>
    </Container>
    )
}

export default MyMakPay
