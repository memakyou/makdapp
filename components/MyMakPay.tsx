import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ThirdwebNftMedia, useAddress, useContract, useNFT, useOwnedNFTs } from "@thirdweb-dev/react";
import { BsCashStack } from "react-icons/bs";

// Define your styled components
const Container = styled.div`
// padding: 0 2rem;

`;

const Main = styled.main`
  padding: 1rem 0;
  display: flex;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;
const InfoSection = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: center;
  width: 100%;
  gap: 1rem;
`;

const CardContainer = styled.div`
width: 100%;
border-radius: 8px;
box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.9);
background-color: #141a20;
padding: 16px;
display: flex;
flex-direction: row;
align-items: center;
gap: 2rem;
border: none; /* Add this line */
transition: border 0.3s; /* Add this line */

@media (min-width: 768px) {
  flex-direction: row;
}

&:hover {
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 1, 0.300);
}
`;

const NftContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;
  // cursor: pointer; /* Add this line to make the container clickable */

`;

const NftName = styled.p`
  margin-right: auto; /* Added this line */
  font-size: 12px;
`;

const BuyButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #d4d4d4;
  margin-left: auto; /* Added this line */

  ${CardContainer}:hover & {
    color: #ccc002;
  }
`;

const DefaultText = styled.p`
  color: #272c34;
  margin: auto;
  text-align: center;
  padding-top: 20px;
  padding-bottom:20px;
`;

const coreContractAddress = "0x7016eb12fa75A763467876F5A352eFe10d3013E1"
const mshrsContractAddress = "0x0880432A2A4D97C7d775566f205aa3c545886430"

const MyMakPay = () => {
   // connect contratc and user
  const { contract } = useContract(coreContractAddress);
  const address = useAddress()  
  
  const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(contract, address);
  
  // Check if user has ownedNFTs
  const hasOwnedNFTs = Boolean(ownedNFTs?.length);
  console.log(hasOwnedNFTs)

  return (
    <Container>
      <Main>
      {hasOwnedNFTs ? (
        <InfoSection>
          {isLoading ? ( 
            <p>Loading...</p> 
          ) : (
            ownedNFTs?.map((nft) => {
              return (
                <CardContainer>
                  <NftContainer>
                    <ThirdwebNftMedia
                      metadata={nft.metadata}
                      width={"50px"}
                      height={"50px"}
                      style={{ borderRadius: "6px" }}
                    />
                    <NftName>
                      CORE #{nft.metadata.id} Token Holder
                    </NftName>
                    <BuyButton><BsCashStack /></BuyButton>
                  </NftContainer>
                </CardContainer>
              );
            })
          )}    
        </InfoSection>
      ) : (
        <DefaultText><h1>😔</h1> You do not have a CORE token yet</DefaultText>
      )}
      </Main>
    </Container>  
  )
}

export default MyMakPay;
