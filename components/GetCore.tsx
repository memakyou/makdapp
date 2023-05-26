import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ThirdwebNftMedia, useContract, useNFT } from "@thirdweb-dev/react";


const Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 0px;
`;

const LeftDiv = styled.div`
  flex: 1;
`;

const RightDiv = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  color: #00000;
  margin-top: 0;
  font-size: 14px;
`;

const Description = styled.p`
  color: #0f1318;
`;

const Cost = styled.p`
  color: #555;
  font-weight: bold;
  // margin-bottom: 10px;
`;

const CoreDataWrapper = styled.p`
  color: #d4d4d4;
  font-weight: bold;
  font-size: 12px;
`;

CoreDataWrapper

const GetCore = () => {
    const [minting, setMinting] = useState(false);
    const { contract } = useContract("0x7016eb12fa75A763467876F5A352eFe10d3013E1");
    const { data: nft, isLoading, error } = useNFT(contract, "0");

    if (isLoading) return <div>Loading...</div>;
    if (error || !nft) return <div>NFT not found</div>;
        
    
    // Define the mint function here

    
  
    return (
<>
        <Container>
        </Container>
        
      <Container>
        <LeftDiv>
        <ThirdwebNftMedia 
            metadata={nft.metadata}
            height={120}
            width={120}
        />
        </LeftDiv>
        <RightDiv>
        <Title>{nft.metadata.description}</Title>
        <CoreDataWrapper>
          <Cost>MEMBERS: {nft.supply}</Cost>
          <Cost>ToT SUPPLEY: 625 🔒</Cost>
          {/* <Cost>PRICE: 10000 $MAK</Cost> */}
          <p></p>
        </CoreDataWrapper>
        </RightDiv>
      </Container>
      {/* <br/> */}
      <Container>
      {/* <Web3Button
              contractAddress="0x7016eb12fa75A763467876F5A352eFe10d3013E1"
              action={(contract) => contract.erc721.claim(1)}
              //   onError={(error) => {
            //     setTransactionStatus('Error');
            //     setTransactionError(error.message);
            //   }}
            //   onSubmit={() => {
            //     setTransactionStatus('Transaction submitted');
            //     setTransactionError('');
            //   }}
            //   onSuccess={(result) => {
            //     setTransactionStatus('Success!');
            //     setTransactionError('');
            //     setIsConfettiVisible(true)
            //   }}            
              className="OverrideWeb3Button"
            >
              GET CORE!
            </Web3Button> */}
        </Container>
      </>
    );
  };
  
  export default GetCore