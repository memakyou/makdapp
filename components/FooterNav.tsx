import Link from "next/link"
import { useRouter } from "next/router"
import styled from 'styled-components';

// Define your styled components
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #878787;
  padding: 0px 24px;
  position: sticky;
  top: 0;
`;

const NavLink = styled.a`
  font-size: medium;
  font-weight: bold;
  margin-right: 20px;
  color: black;

  &:hover {
    border-bottom: 5px solid #ccc002;
  }
`;

const ActiveNavLink = styled(NavLink)`
  font-size: large;
  color: #ccc002;
  border-bottom: 5px solid #d1d1d1;
`;

const FooterNav: React.FC = () => {
    const router = useRouter()
    
    return  (
        <Container>
            <div>
                <Link legacyBehavior href={"/terms-of-service"}>
                    <NavLink className={router.pathname == "/terms-of-service" ? "active" : ""}>Usage Terms</NavLink>
                </Link>
                <Link legacyBehavior href={"/mshrs-agreement"}>
                    <NavLink className={router.pathname == "/mshrs-agreement" ? "active" : ""}>MSHRS Agreement</NavLink>
                </Link>
                <Link legacyBehavior href={"/privacy-policy"}>
                    <NavLink className={router.pathname == "/privacy-policy" ? "active" : ""}>Policy</NavLink>
                </Link>
            </div>
        </Container>
    )
}

export default FooterNav