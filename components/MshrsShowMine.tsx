import { ThirdwebNftMedia, useAddress, useContract, useOwnedNFTs, useClaimNFT, Web3Button, Token } from '@thirdweb-dev/react'
import styled from 'styled-components'

// Define your styled components
const Container = styled.div`
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

const DefaultText = styled.div`
  color: #272c34;
  margin: auto;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const NoNFTsMessage = styled.h1`
  font-size: 32px;
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

const mshrsContractAddress = "0x0880432A2A4D97C7d775566f205aa3c545886430"

const MshrsShowMine: React.FC = () => {
  const { contract } = useContract(mshrsContractAddress);
  const address = useAddress()  
  const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(contract, address);
  
  // Check if user has ownedNFTs
  const hasOwnedNFTs = Boolean(ownedNFTs?.length);
  
  const sharePertoken = 0.0002

  return (
    <Container>
      <Main>
      {hasOwnedNFTs ? (
        <InfoSection>
          {isLoading ? ( 
            <p>Loading...</p> 
          ) : (
            ownedNFTs?.map((nft, index) => {
              const quantityOwned = Number(nft.quantityOwned); // Convert to number

              return (
                <CardContainer key={index}>
                <NftContainer>
                    <ThirdwebNftMedia
                      metadata={nft.metadata}
                      width={"50px"}
                      height={"50px"}
                      style={{ borderRadius: "6px" }}
                    />
                    <NftName>
                      You own <a>{quantityOwned}</a> music shares in <a>{nft.metadata.name}</a>, a <a>{(quantityOwned * sharePertoken).toFixed(3)}%</a> stake
                    </NftName>
                  </NftContainer>
                </CardContainer>
              );
            })
          )}    
        </InfoSection>
      ) : (
        <DefaultText>
          <NoNFTsMessage>😔</NoNFTsMessage>
          You have not purchased any music shares yet
        </DefaultText>        
      )}
      </Main>
    </Container>
  );
}

export default MshrsShowMine;
