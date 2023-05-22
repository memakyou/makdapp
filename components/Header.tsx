import { ConnectWallet } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import Image from 'next/image';
import Logo from '../public/main_logo.png';
import styled from 'styled-components';

// Define your styled components
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #D4D4D4;
  height: 100px;
  padding: 24px;
`;

const Header: React.FC = () => {
    const router = useRouter();
    return  (
        <Container>
            <div>
                <Image
                    src={Logo}
                    alt="ccc002"
                    width={50}
                    height={50}
                />   
            </div>
            <ConnectWallet />
        </Container>
    );
};

export default Header;
