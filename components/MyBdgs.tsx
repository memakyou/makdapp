import { ThirdwebNftMedia, useAddress, useContract, useOwnedNFTs } from '@thirdweb-dev/react'
import styled from 'styled-components'
import { useState, useEffect, useRef } from 'react'

// Define your styled components

const Container = styled.div`
  padding: 0 2rem;
`;

const Main = styled.main`
  padding: 1rem 0;
  flex: 1;
  display: flex;
  flex-wrap: wrap; /* Added this line to wrap items to a new row */
  justify-content: center; /* Added this line to center items horizontally */
  gap: 1rem; /* Added this line to add spacing between elements */
  z-index: 1;
  `;

const NftContainer1 = styled.div`
  position: relative; /* Added this line to position the tooltip */
  display: flex;
  align-items: center;
  gap: 4rem;
  margin-bottom: 1rem; /* Added this line to create a gap between rows */
  cursor: pointer; /* Added this line to indicate the element is clickable */
  // z-index: 1;
`;

const Tooltip = styled.div<{ show: boolean }>`
  position: absolute;
  bottom: -50px; /* Adjusted to drop the bubble down by 20 pixels */
  left: 50%; /* Adjust the tooltip position */
  transform: translateX(-50%);
  width: 150px; /* Adjust the width as needed */
  background-color: #141a20; /* Updated to dark background color */
  color: #d4d4d4; /* Updated to text color */
  border-radius: 5px;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  align-items: center; /* Added to center the NFT name */
  justify-content: center; /* Added to center the NFT name */
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: visibility 0.3s, opacity 0.3s;
`;

const NftName = styled.p`
  font-size: 12px;
  margin: 0; /* Updated to remove default margin */
  text-align: center; /* Added to center the NFT name */
  
`;

const DefaultText = styled.p`
  color: #272c34;
  margin: auto;
  text-align: center;
  padding-top: 20px;
  padding-bottom:20px;
`;


const NoNFTsMessage = styled.h1`
  font-size: 32px;
`;

const bdgsContractAddress = "0xBBC9956157e7cb58404F1B02cEaE029971aB6bbe"
const coreContractAddress = "0x7016eb12fa75A763467876F5A352eFe10d3013E1"
const mshrsContractAddress = "0x0880432A2A4D97C7d775566f205aa3c545886430"

const MyBdgs: React.FC = () => {
  const { contract } = useContract(bdgsContractAddress);
  const address = useAddress()  
  const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(contract, address);
  
  const [showTooltip, setShowTooltip] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<any>(null);

  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (nft: any, event: React.MouseEvent<HTMLDivElement>) => {
    if (event) {
      event.stopPropagation();
    }
    setSelectedNFT(nft);
    setShowTooltip(true);
  };
  
  
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (showTooltip && tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    };
  
    document.addEventListener('click', handleOutsideClick);
  
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [showTooltip]);
  
  


  return (
    <Container>
      <Main>
        {isLoading ? (
          <p>Loading...</p>
        ) : ownedNFTs?.length ? (
          ownedNFTs.map((nft) => (
            <NftContainer1
              key={nft.metadata.id}
              onClick={(event) => handleClick(nft, event)} // Pass the event object
              >
              <ThirdwebNftMedia
                metadata={nft.metadata}
                width={"70px"}
                height={"70px"}
                style={{ borderRadius: '500px' }}
              />
              <Tooltip
                ref={tooltipRef}
                show={showTooltip && selectedNFT === nft}
                onClick={(event) => event.stopPropagation()}
                data-tooltip="true"
              >
                <NftName>{nft.metadata.name}</NftName>
              </Tooltip>

            </NftContainer1>
          ))
        ) : (
          <DefaultText>
          <NoNFTsMessage>😔</NoNFTsMessage>
          You have not earned any supporter badges yet
        </DefaultText>  
           
        )}
      </Main>
    </Container>
  );
}

export default MyBdgs;
