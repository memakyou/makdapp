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

const CoreDataWrapper = styled.div`
  color: #d4d4d4;
  font-weight: bold;
  font-size: 12px;
`;

CoreDataWrapper

const GetCore = () => {
    const [minting, setMinting] = useState(false);
    const { contract } = useContract("0x7016eb12fa75A763467876F5A352eFe10d3013E1");
    const { data: nft, isLoading, error } = useNFT(contract, "34");

    if (isLoading) return <div>Loading...</div>;
    if (error || !nft) return <div>NFT not found</div>;
        
    
    // Define the mint function here

    
  
    return (
        <Container>
        <LeftDiv>
        <ThirdwebNftMedia 
            metadata={nft.metadata}
            height={"120"}
            width={"120"}
        />
        </LeftDiv>
        <RightDiv>
        <Title>{nft.metadata.description}</Title>
        <CoreDataWrapper>
          <Cost>MEMBERS: {nft.supply}</Cost>
          <Cost>TOTAL SUPPLEY: 625 🔒</Cost>
          {/* <Cost>PRICE: 10000 $MAK</Cost> */}
          <p></p>
        </CoreDataWrapper>
        </RightDiv>
      </Container>
      
    );
  };
  
  export default GetCore