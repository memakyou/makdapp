import { useContract, useContractRead, useContractWrite, useNFTs, useMintNFT, ThirdwebNftMedia, useAddress, Web3Button } from "@thirdweb-dev/react";
import styled from "styled-components";
import { FaShoppingCart } from "react-icons/fa";
import { useWindowSize } from "react-use";
import { useEffect, useRef, useState } from "react";
import Confetti from 'react-confetti';
import emailjs from 'emailjs-com';
import Link from 'next/link';

const Container = styled.div`
  // padding: 0 2rem;
`;

const Main = styled.main`
  padding: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const StyledThirdwebNftMedia = styled(ThirdwebNftMedia)`

  transition: transform 0.5s;
  // box-shadow: 0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  &:hover {
    background-color: #ccc002;
    box-shadow: 0px 14px 28px rgba(0,0,0,0.25), 0px 10px 10px rgba(0,0,0,0.22);
  }
`;

const NftContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;
`;

const NftName = styled.p`
  margin-right: auto; /* Added this line */
  font-size: 12px;
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
  cursor: pointer;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  &:hover {
    box-shadow: 5px 5px 5px 0px rgba(0, 0, 1, 0.300);
  }
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

const Modal = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #d4d4d4;
  display: ${({ open }) => (open ? "block" : "none")};
  z-index: 9999; /* Keep the same z-index as before */


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
    overflow: auto; /* Add this line to enable scrolling */
    -webkit-overflow-scrolling: touch; /* Enable smooth scrolling on touch devices */
  }
`;

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 9999; /* Keep the same z-index as before */
  background: linear-gradient(45deg, #d4d4d4, #878787);
  background-size: 400% 400%;
  animation: gradientAnimation 10s ease-in-out infinite;
  
  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
  color: #fff;
  cursor: pointer;
  z-index: 10000; 

  &:hover {
    color: #ccc002;
  }
`;

const ModalTitle = styled.h1`
  margin-bottom: 20px;
  font-size: 16px;
  color: black;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100% - 30px);
  gap: 10px;
`;

const Slider = styled.input`
  width: 100%;
  margin: auto;
  appearance: none;

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    background: #333;
    border: none;
    border-radius: 0;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 16px;
    width: 16px;
    border-radius: 0%;
    background: #ccc002;
    margin-top: -4px;
  }
`;

const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  width: 100%;
`;

const TextBox = styled.input`
  width: 100%;
  margin: 10px 0;  
  text-align: center;
  border: none;
  background: none;
  color: #ccc002;
  font-size: 16px;
`;

const TextBox2 = styled.input`
  // margin: 10px 0;  
  // text-align: center;
  border: none;
  background: none;
  color: #444;
  font-size: 12px;
`;

const PercentageBox = styled.div`
  color: #444;
  // text-align: center;
  font-size: 12px;
`;

const PercentageBox1 = styled.div`
  color: #444;
  // text-align: center;
  font-size: 12px;
`;

const StatusMessage = styled.p`
  color: #444;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const SuccessLink = styled.p`
  color: green;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const TermsCheckbox = styled.div`
  display: flex;
  align-items: center;
  color: grey;

  & input[type=checkbox] {
    margin-right: 30px;
  }

  label {
    font-size: 12px; /* Added this line */
    color: #444444; /* Added this line */
  }

  label.error {
    color: red;
  }
`;

const AddressForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%
`;

const Input = styled.input`
  // padding: 5px;
  width: 100%;
  border: 1px solid #d4d4d4;
  background-color: #d4d4d4;
  border-radius: 0px;
  font-size: 12px;
`;

const PurchaseReceipt = styled.div`
  background-color: #999;
  width: 100%;
  border-radius: 6px;
  padding: 10px;
`;

const PurchaseStatusBox = styled.div`
  background-color: #999;
  width: 100%;
  border-radius: 6px;
  padding: 10px;
`;

const a1 = styled.a`
  background-color: #999;
  width: 100%;
  border-radius: 6px;
  padding: 10px;
`;

const PurchaseIcon2 = styled.span`
  font-size: 16px;
  margin-right: 10px;
  color: ##e7e8e8;
`;

const MshrsShowAll: React.FC = () => {
  const mshrsContract = process.env.MSHRS_CONTRACT //set up env var but not able to pass to thirdweb without being a string. will seak help from third web.

  const address = useAddress();
  const { contract } = useContract("0x0880432A2A4D97C7d775566f205aa3c545886430");

  const { data: nfts, isLoading, error } = useNFTs(contract);

  const { width, height } = useWindowSize();
  const [isConfettiVisible, setIsConfettiVisible] = useState(false);

  const [transactionStatus, setTransactionStatus] = useState('');
  const [transactionError, setTransactionError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLMediaElement>(null);


  const sendEmail = (emailContent: string) => {
    // console.log("Email content:", emailContent); // Add this console.log statement

    const templateParams = {
      to_email: "isthatmak@gmail.com", // Replace with your desired recipient email address
      subject: "MSHRS SUPPORTER PLAQUE ORDER",
      message: emailContent, // Check if emailContent is correctly assigned to the content parameter
    };

    emailjs.send("service_qy5dyxh", "template_zu7uhvx", templateParams, "oetc636JvIIsre0jz")
      .then((response) => {
        console.log("Email sent successfully!", response.text);
      })
      .catch((error) => {
        console.error("Email sending failed:", error);
      });
  };

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const dx = (clientX - innerWidth / 2) / 20; // change the divisor for more/less sensitivity
      const dy = (clientY - innerHeight / 2) / 20; // change the divisor for more/less sensitivity

      if (ref.current) {
        ref.current.style.transform = `perspective(1000px) rotateX(${dy}deg) rotateY(${dx}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Check if user has ownedNFTs

  // pricing logistics
  const sharePertoken = 0.0002;
  const mshrsUnitPrice = 0.65;
  const mshrsUnitMinOrder = 20;
  const mshrsUnitMaxOrder = 5000;

  const [isModalOpen, setModalOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);

  const [selectedNFT, setSelectedNFT] = useState<null | { metadata: any }>(null);
  const [isShippingChecked, setIsShippingChecked] = useState(false);
  const [isAddressFormVisible, setIsAddressFormVisible] = useState(false);

  const handleAddressCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsShippingChecked(isChecked);
    setIsAddressFormVisible(isChecked);
  };
  

  const handleWeb3ButtonSuccess = (result: { transactionHash: any }) => {
    setTransactionStatus('Success!');
    setTransactionError('');
    setIsConfettiVisible(true);

    let emailContent = `Congratulations, your purchase was successful! Transaction ID: ${result.transactionHash}`;

    if (isShippingChecked) {
      // const shippingName = (document.getElementById('shippingName') as HTMLInputElement)?.value;
      const email = (document.getElementById('email') as HTMLInputElement)?.value;
      const streetAddress = (document.getElementById('streetAddress') as HTMLInputElement)?.value;
      const city = (document.getElementById('city') as HTMLInputElement)?.value;
      const state = (document.getElementById('state') as HTMLInputElement)?.value;
      const zipEir = (document.getElementById('zipEir') as HTMLInputElement)?.value;
      const country = (document.getElementById('country') as HTMLInputElement)?.value;
      const shippingNotes = (document.getElementById('shippingNotes') as HTMLTextAreaElement)?.value;

      emailContent += `\n\nShipping Details:\n\nName: ${address}\nEmail: ${email}\nStreet Address: ${streetAddress}\nCity: ${city}\nState: ${state}\nZip/Eir: ${zipEir}\nCountry: ${country}\nShares Purchased: ${sliderValue}\nID: ${selectedNFT?.metadata.id}\nSong Name: ${selectedNFT?.metadata.name}`;
    }
    if (isShippingChecked) {
      sendEmail(emailContent);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedNFT(null);
    setTransactionStatus('');
    setTransactionError('');
    setIsConfettiVisible(false);
    setSliderValue(50);
    setIsShippingChecked(false);
    setIsAddressFormVisible(false);
    setTermsAccepted(false); // Reset the checkbox state
  };

  return (
    <Container>
      <h2>MUSIC SHARES <a>$MSHRS</a></h2>
      <Main>
        {isConfettiVisible && 
          <Confetti
            width={width}
            height={height}
            numberOfPieces={300}
            wind={0.01}
            gravity={0.1}
            tweenDuration={1000}
            run={true}
            style={{ position: 'fixed', zIndex: 10000 }} // Add this to make the confetti overlay the content
          />
        }
        <Modal open={isModalOpen}>
          <div>
            <CloseButton onClick={handleModalClose}>X</CloseButton>
            <ModalOverlay isOpen={isModalOpen}>

            <ModalContent>
            <h3>Buy Shares <PurchaseIcon2><FaShoppingCart/></PurchaseIcon2></h3>
              {selectedNFT && (
                <div ref={containerRef}>
                <StyledThirdwebNftMedia 
                  height={"150px"}
                  width={"150px"}
                  ref={mediaRef} 
                  metadata={selectedNFT.metadata} 
                />
                </div>
                )
              }

              <ModalTitle>{selectedNFT?.metadata.name || 'Loading...'}</ModalTitle>
             
              {transactionStatus !== 'Success!' && (
                <>
                  <ProgressBarContainer>
                    <Slider 
                      type="range" 
                      min={mshrsUnitMinOrder} 
                      max={mshrsUnitMaxOrder} 
                      value={sliderValue} 
                      onChange={(e) => setSliderValue(parseInt(e.target.value))} 
                    />
                  </ProgressBarContainer>
                </>
              )}

              <br/>
              <PercentageBox1>Order Summary:</PercentageBox1>
              <PurchaseReceipt>
                <PercentageBox><b>Tokens:</b><TextBox2 type="text" value={sliderValue} readOnly /></PercentageBox>
                <PercentageBox><b>Shares:</b> {(sharePertoken * sliderValue).toFixed(4)}%</PercentageBox>
              
              {sliderValue >= 500 && (
                <TermsCheckbox>
                  <br/><br/>
                  <label htmlFor="shipping">🎁 Shipping Address</label>
                  <input
                    type="checkbox"
                    id="shipping"
                    name="shipping"
                    checked={isShippingChecked}
                    onChange={handleAddressCheckboxChange}
                  />
                </TermsCheckbox>
              )}
              </PurchaseReceipt>

              {isShippingChecked && transactionStatus !== 'Success!' && isAddressFormVisible && sliderValue >= 500 && (
                <PurchaseReceipt>
                  <AddressForm>
                    <Input type="text" id="email" placeholder="Email" />
                    <Input type="text" id="streetAddress" placeholder="Street Address"/>
                    <Input type="text" id="city" placeholder="City"/>
                    <Input type="text" id="state" placeholder="State"/>
                    <Input type="text" id="zipEir" placeholder="Zip/Eircode"/>
                    <Input type="text" id="country" placeholder="Country"/>
                  </AddressForm>
                </PurchaseReceipt>
              )}

              {transactionStatus && (
                <PurchaseStatusBox>
                  <StatusMessage>{transactionStatus}</StatusMessage>
                  {transactionError && <ErrorMessage>Error: There has been an error, please try again.</ErrorMessage>}
                  {transactionStatus === 'Success!' && <SuccessLink>Now stream MEMAKYOU to earn royalties</SuccessLink>}
                </PurchaseStatusBox>
              )}

              {transactionStatus !== 'Success!' && (
                <>
                  <Web3Button
                    contractAddress="0x0880432A2A4D97C7d775566f205aa3c545886430"
                    action={(contract) => contract.erc1155.claim(selectedNFT?.metadata.id, sliderValue)}
                    onError={(error) => {
                      setTransactionStatus('Error');
                      setTransactionError(error.message);
                    }}
                    onSubmit={() => {
                      setTransactionStatus('Transaction submitted');
                      setTransactionError('');
                    }}
                    onSuccess={(result) => {
                      setTransactionStatus('Success!');
                      setTransactionError('');
                      setIsConfettiVisible(true);
                      handleWeb3ButtonSuccess(result); 
                    }}            
                    className="OverrideWeb3Button"
                    isDisabled={!termsAccepted}
                  >
                    PURCHASE €{(sliderValue * mshrsUnitPrice).toFixed(2)}
                  </Web3Button>
                  <PurchaseReceipt>
                    <TermsCheckbox>
                      <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        value={termsAccepted ? 'true' : 'false'} // Convert boolean to string
                        checked={termsAccepted} // Use boolean directly
                        onChange={() => setTermsAccepted(!termsAccepted)}
                      />                      
                      <label htmlFor="terms" className={!termsAccepted ? 'error' : ''}>
                        I accept the terms of the MSHRS Agreement
                      </label> 
                    </TermsCheckbox>
                  </PurchaseReceipt>

                </>
              )}
            </ModalContent>
            </ModalOverlay>
          </div>
        </Modal>

        {isLoading ? (
          <p>Loading...</p>
        ) : nfts && nfts.length > 0 ? (
          nfts.map((nft) => {
            return (
              <CardContainer key={nft.metadata.id} onClick={() => (setModalOpen(true), setSelectedNFT(nft))}>
                <NftContainer>
                  <StyledThirdwebNftMedia
                    metadata={nft.metadata}
                    height={"50px"}
                    width={"50px"}
                    style={{ borderRadius: "15px" }}
                  />
                  <NftName>{nft.metadata.name}</NftName>
                  <BuyButton><FaShoppingCart /></BuyButton>
                </NftContainer>
              </CardContainer>
            );
          })
        ) : (
          <p>No NFTs found.</p>
        )}
      </Main>
    </Container>
  )
}

export default MshrsShowAll;
