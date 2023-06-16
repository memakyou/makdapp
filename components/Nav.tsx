import Link from "next/link";
import { useRouter } from "next/router";
import { useAddress, useTokenBalance, useContract } from "@thirdweb-dev/react";
import styled from "styled-components";

// Define your styled components
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #878787;
  padding: 0px 24px 0px;
  position: sticky;
  height: 50px;
  top: 0;
`;

const NavLink = styled.a`
  font-size: medium;
  font-weight: bold;
  margin-right: 24px;
  color: black;
  cursor: pointer;

  &:hover {
    border-bottom: 5px solid #ccc002;
  }
`;

const ActiveNavLink = styled(NavLink)`
  font-size: large;
  color: #d4d4d4;
  border-bottom: 5px solid #ccc002;
`;

const Bal = styled.p`
  color: black;
`;

const Nav: React.FC = () => {
  const router = useRouter();
  const address = useAddress();
  const tokenContractAddress = "0x37524Cf8f213C2EE089bbC9b95ECf1978BcFA2A7";
  const { contract: tokenContract } = useContract(tokenContractAddress, "token");

  const { data: tokenBalance } = useTokenBalance(tokenContract || undefined, address);

  const isActiveLink = (path: string) => router.pathname === path;

  return (
    <Container>
      <div>
        <Link legacyBehavior href={"/"}>
          {isActiveLink("/") ? (
            <ActiveNavLink>ME</ActiveNavLink>
          ) : (
            <NavLink>ME</NavLink>
          )}
        </Link>
        <Link legacyBehavior href={"/mak"}>
          {isActiveLink("/mak") ? (
            <ActiveNavLink>MAK</ActiveNavLink>
          ) : (
            <NavLink>MAK</NavLink>
          )}
        </Link>
        <Link legacyBehavior href={"/you"}>
          {isActiveLink("/you") ? (
            <ActiveNavLink>YOU</ActiveNavLink>
          ) : (
            <NavLink>YOU</NavLink>
          )}
        </Link>
      </div>
      <Bal>
        <b>
          {tokenBalance ? parseFloat(tokenBalance.displayValue).toFixed(2) : "0.00 MAK"}{" "}
          {tokenBalance?.symbol}
        </b>
      </Bal>
    </Container>
  );
};

export default Nav;
