import Image from 'next/image'
import styled from 'styled-components';
import MakIcon from '../public/mak-icon-dark.png'
import FooterNav from "./FooterNav"

// Define your styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #878787;
  height: 100px;
  padding: 20px;
  z-index: 9999;
`;

const LogoImage = styled(Image)`
  // Add any specific styles for the logo image here
`;

const Footer: React.FC = () => {
    return  (
        <Container>
            <div>
                <LogoImage
                    src={MakIcon}
                    alt="ccc002"
                    width={25}
                    height={25}
                />
            </div>
            <FooterNav/>
        </Container>
    )
}

export default Footer
