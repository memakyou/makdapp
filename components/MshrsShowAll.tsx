import { useContract, useContractRead, useContractWrite, useNFTs, useMintNFT, ThirdwebNftMedia, useAddress, Web3Button } from "@thirdweb-dev/react"
import styled from "styled-components";
import { FaShoppingCart } from "react-icons/fa";
import { useWindowSize } from "react-use";
import { useEffect, useRef, useState } from "react";
import Confetti from 'react-confetti'
import emailjs from 'emailjs-com';


const Container = styled.div`
  // padding: 0 2rem;
`;

const Main = styled.main`
  padding: 1rem 0;
  display: flex;
  flex-wrap: wrap;
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

const StyledThirdwebNftMedia = styled(ThirdwebNftMedia)`
  transition: transform 0.5s;
  box-shadow: 0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24);
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
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
`;

const ModalTitle = styled.h1`
  margin-bottom: 20px;
  color: black;
`;


const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: calc(100% - 30px);
  gap: 20px;
`;

const Slider = styled.input`
  width: 100%;
  margin: 20px 0;

  /* Change color of slider */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    background: #ccc002;
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: #ccc002;
    cursor: pointer;
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

const PriceBox = styled.div`
  color: green;
  text-align: center;
  font-size: 40px;
`;
const PercentageBox = styled.div`
  color: #444;
  text-align: center;
  font-size: 10px;
`;

const PercentageBoxSum = styled.div`
  color: green;
  text-align: center;
  font-size: 20px;
`;

const StatusMessage = styled.p`
  color: black;
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
  margin-bottom: 10px;
  color: grey;

  & input[type=checkbox] {
    margin-right: 5px;
  }

  label.error {
    color: red;
  }
`;

const AddressForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 80%
`;

const Label = styled.label`
  color: grey;
`;

const Input = styled.input`
  padding: 5px;
  width: 100%;
  border: 1px solid black;
  border-radius: 16px;
`;



const MshrsShowAll: React.FC = () => {
  const address = useAddress();
  const { contract } = useContract("0x0880432A2A4D97C7d775566f205aa3c545886430");
  const { data: nfts, isLoading, error } = useNFTs(contract);

  const { width, height } = useWindowSize();
  const [isConfettiVisible, setIsConfettiVisible] = useState(false);

  const [transactionStatus, setTransactionStatus] = useState('');
  const [transactionError, setTransactionError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const sendEmail = (emailContent: string) => {
    // console.log("Email content:", emailContent); // Add this console.log statement

    const templateParams = {
      to_email: "isthatmak@gmail.com", // Replace with your desired recipient email address
      subject: "MSHRS SUPPORTER PLAQUE ORDER",
      message: emailContent, // Check if emailContent is correctly assigned to the content parameter
    };
  
    emailjs.send("service_qy5dyxh", "template_zu7uhvx", templateParams, "oetc636JvIIsre0jz" )
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

      if(ref.current) {
        ref.current.style.transform = `perspective(1000px) rotateX(${dy}deg) rotateY(${dx}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Check if user has ownedNFTs  
  
  const sharePertoken = 0.0002
  const mshrsContract = process.env.MSHRS_CONTRACT;



  const [isModalOpen, setModalOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [isShippingChecked, setIsShippingChecked] = useState(false);
  const [isAddressFormVisible, setIsAddressFormVisible] = useState(false);

  const handleAddressCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIsShippingChecked(isChecked);
    setIsAddressFormVisible(isChecked);
  };
  

  const mshrsUnitPrice = 3;
  
  const handleWeb3ButtonSuccess = (result: { transactionHash: any }) => {
    setTransactionStatus('Success!');
    setTransactionError('');
    setIsConfettiVisible(true);
  
    let emailContent = `Congratulations, your purchase was successful! Transaction ID: ${result.transactionHash}`;
  
    if (isShippingChecked) {
      const shippingName = (document.getElementById('shippingName') as HTMLInputElement)?.value;
      const streetAddress = (document.getElementById('streetAddress') as HTMLInputElement)?.value;
      const city = (document.getElementById('city') as HTMLInputElement)?.value;
      const state = (document.getElementById('state') as HTMLInputElement)?.value;
      const zipEir = (document.getElementById('zipEir') as HTMLInputElement)?.value;
      const country = (document.getElementById('country') as HTMLInputElement)?.value;
      const shippingNotes = (document.getElementById('shippingNotes') as HTMLTextAreaElement)?.value;
        
      emailContent += `\n\nShipping Details:\n\nName: ${shippingName}\nStreet Address: ${streetAddress}\nCity: ${city}\nState: ${state}\nZip/Eir: ${zipEir}\nCountry: ${country}\nShipping Notes: ${shippingNotes}`;
    }
  
    sendEmail(emailContent);
  };
  



  return (
    <Container>
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
            style={{ position: 'fixed', zIndex: 1 }} // Add this to make the confetti overlay the content
          />
        }
        <Modal open={isModalOpen}>
          <div>
            <CloseButton onClick={() => {
              setModalOpen(false);
              setSelectedNFT(null);
              setTransactionStatus('');
              setTransactionError('');
              setIsConfettiVisible(false)
            }}>X
            </CloseButton>
            <ModalContent>
              {selectedNFT && <StyledThirdwebNftMedia ref={ref} metadata={selectedNFT.metadata} />}
              <ModalTitle>{selectedNFT?.metadata.name || 'Loading...'}</ModalTitle>
              <Slider 
                type="range" 
                min="5" 
                max="1000" 
                value={sliderValue} 
                onChange={(e) => setSliderValue(parseInt(e.target.value))} 
              />
              <TextBox type="text" value={sliderValue} readOnly />
              <PercentageBox>Purchasing <PercentageBoxSum>{sharePertoken * sliderValue}%</PercentageBoxSum> Music Shares</PercentageBox>
              <PercentageBox><b>Costing</b></PercentageBox>
              <PriceBox>${sliderValue * mshrsUnitPrice}</PriceBox>
              {sliderValue >= 500 && (
                <TermsCheckbox>
                  <input
                    type="checkbox"
                    id="shipping"
                    name="shipping"
                    checked={isShippingChecked}
                    onChange={handleAddressCheckboxChange}
                  />
                  <label htmlFor="shipping">Add a delivery address for your physical supporter plaque</label>
                </TermsCheckbox>
              )}
              
              {isShippingChecked && isAddressFormVisible && sliderValue >= 500 &&  (
                <AddressForm>
                <Label>Shipping Name</Label>
                <Input type="text" id="shippingName" />
              
                <Label>Street Address</Label>
                <Input type="text" id="streetAddress" />
                
                <Label>City</Label>
                <Input type="text" id="city" />
                
                <Label>State</Label>
                <Input type="text" id="state" />
                
                <Label>Zip/Eir</Label>
                <Input type="text" id="zipEir" />
              
                <Label>Country</Label>
                <Input type="text" id="country" />
              
                <Label>Shipping Notes</Label>
                <Input type="text" id="shippingNotes" />
              </AddressForm>
              )}
              
              <StatusMessage>{transactionStatus}</StatusMessage>
              {transactionError && <ErrorMessage>Error: There has been an error, please try again.</ErrorMessage>}

              {transactionStatus === 'Success!' && <SuccessLink>Awesome, stream MEMAKYOU to earn royalties</SuccessLink>}
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
                  handleWeb3ButtonSuccess(result); // This line triggers the function
                }}            
                className="OverrideWeb3Button"
                isDisabled={!termsAccepted}
              >
                CONFIRM PURCHASE!
              </Web3Button>
            
              <TermsCheckbox>
                <input type="checkbox" id="terms" name="terms" value={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)}/>
                <label htmlFor="terms" className={!termsAccepted ? 'error' : ''}>
                  I accept the terms of the MSHRS Agreement
                </label> 
              </TermsCheckbox>
            </ModalContent>
          </div>
        </Modal>

        {isLoading ? (
  <p>Loading...</p>
) : nfts && nfts.length > 0 ? (
  nfts.map((nft) => {
    return (
      <CardContainer key={nft.metadata.id} onClick={() => (setModalOpen(true), setSelectedNFT(nft))}>
        <NftContainer>
          <ThirdwebNftMedia
            metadata={nft.metadata}
            height="70px"
            width="70px"
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
