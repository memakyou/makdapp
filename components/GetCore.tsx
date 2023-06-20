import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ThirdwebNftMedia, useContract, useNFT } from "@thirdweb-dev/react";


const Container = styled.div`
  display: flex;
  padding: 0px;
  gap: 2rem;
  justify-content: centre;
`;

const LeftDiv = styled.div`
  // flex: 1;
`;

const RightDiv = styled.div`
  flex: 2;
  
`;

const Title = styled.h3`
  color: #00000;
  margin-top: 0;
  font-size: 12px;
`;

const Cost = styled.h4`
  color: #141a20;
  
`;

const CoreDataWrapper = styled.div`
  color: #d4d4d4;
  font-weight: bold;
  font-size: 12px;
`;

const GetCore = () => {
    const { contract } = useContract("0x7016eb12fa75A763467876F5A352eFe10d3013E1");
    const { data: nft, isLoading, error } = useNFT(contract, "123");

    if (isLoading) return <div>Loading...</div>;
    if (error || !nft) return <div>NFT not found</div>;
        
    
    // Define the mint function here

    
  
    return (
        <Container>
        <LeftDiv>
        <ThirdwebNftMedia 
            metadata={nft.metadata}
            height={"50px"}
            width={"50px"}
            style={{ borderRadius: "6px" }}
        />
        </LeftDiv>
        <RightDiv>
        <Title>CORE 0<a>11</a>000<a>11</a></Title>
        <CoreDataWrapper>
          <Cost>MEMBERS: {nft.supply} 🔒</Cost>
        </CoreDataWrapper>
        </RightDiv>
        
      </Container>
      
    );
  };
  
  export default GetCore