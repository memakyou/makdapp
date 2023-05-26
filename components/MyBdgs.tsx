import { ThirdwebNftMedia, useAddress, useContract, useOwnedNFTs, useClaimNFT, Web3Button } from '@thirdweb-dev/react'
import styled from 'styled-components'
import { useState, useRef, useEffect } from 'react'

// Define your styled components

const Container = styled.div`
  padding: 0 2rem;
`;

const CustomModal = styled.div<{ open: boolean }>`
top: 0;
left: 0;
background: #d4d4d4;
width: 100%;
z-index: 9999; /* Update the z-index value */


  
  & > div {
    width: 100%;
    height: 100%;
    background: #d4d4d4;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    box-sizing: border-box;
    border-radius: 4px;
  `


// const Modal = styled.div<{ open: boolean }>`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: #d4d4d4;
//   display: ${({ open }) => (open ? "block" : "none")};

//   & > div {
//     width: 100%;
//     height: 100%;
//     background: #d4d4d4;
//     position: relative;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     padding: 20px;
//     box-sizing: border-box;
//     border-radius: 4px;
//   }
// `;

const Main = styled.main`
  padding: 1rem 0;
  flex: 1;
  display: flex;
  flex-wrap: wrap; /* Added this line to wrap items to a new row */
  justify-content: center; /* Added this line to center items horizontally */
  gap: 1rem; /* Added this line to add spacing between elements */
  z-index: ;

  `;

const Item = styled.div`
  // box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.048);
  // align-self: flex-start; /* Add this line to align items to the top */

  &:hover {
  }
`;


const TextBox = styled.input`
  width: 100%;
  margin: 10px 0;  
  text-align: center;
  border: none;
  background: none;
  color: black;
  font-size: 20px;
`;

const DefaultText = styled.p`
  color: #272c34;
  margin: auto;
  text-align: center;
  padding-top: 20px;
  padding-bottom:20px;
`;

const NftContainer = styled.div`
  position: relative; /* Added this line to position the tooltip */
  display: flex;
  align-items: center;
  gap: 4rem;
  margin-bottom: 1rem; /* Added this line to create a gap between rows */
`;

const NftName = styled.p`
  margin-right: auto; /* Added this line */
  font-size: 12px;
`;

const SubTitle = styled.h2`
  color: #d4d4d4
  
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
  &:hover {
    color: #ccc002;
  }
  
`;

const ModalContent = styled.div`
display: flex;
flex-direction: row;
align-items: center;
height: calc(100% - 30px);
z-index: 9999; /* Update the z-index value */

`;



const MyBdgs: React.FC = () => {

  const { contract } = useContract("0xBBC9956157e7cb58404F1B02cEaE029971aB6bbe");
  const address = useAddress()  
  const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(contract, address);
  
// Check if user has ownedNFTs
  const hasOwnedNFTs = Boolean(ownedNFTs?.length);
  const [selectedNFT, setSelectedNFT] = useState(null);
  
  return (
    <Container>
      <Main>
        {isLoading ? (
          <p>Loading...</p>
        ) : ownedNFTs?.length ? (
          ownedNFTs.map((nft) => (
            <NftContainer
              key={nft.metadata.id}
            >
              <ThirdwebNftMedia
                metadata={nft.metadata}
                width={70}
                height={70}
                style={{ borderRadius: '500px' }}
              />
            </NftContainer>
          ))
        ) : (
          <>
            <DefaultText>😔 You have not earned any supporter badges yet</DefaultText>
          </>
        )}
        {/* {isModalOpen && selectedNFT && (
          <CustomModal open={isModalOpen}>
            <div>
              <CloseButton onClick={() => setModalOpen(false)}>X</CloseButton>
              <ModalContent>
                <DefaultText>{selectedNFT.metadata.name}</DefaultText>
                <DefaultText><b>LEVEL</b> XX</DefaultText>
              </ModalContent>
            </div>
          </CustomModal>
        )} */}

      </Main>
    </Container>
    )
}

export default MyBdgs
