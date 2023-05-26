import { NextPage } from 'next';
import { FaYoutube, FaInstagram, FaSpotify, FaTiktok, FaTwitter, FaDiscord } from 'react-icons/fa';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0 2rem;
`;

const InfoSection = styled.section`
  text-align: center;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 75px;
  height: 75px;
  object-fit: cover;
`;

const Verified = styled.img`
  width: 14px;
  height: 14px;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const IconLink = styled.a`
  color: #d4d4d4;
  
  &:hover {
    color: #ccc002;
  }
`;

const Title = styled.p`
  color: #d4d4d4;
  font-size: 16px;
  
  &:hover {
    color: #ccc002;
  }
`;

const Description = styled.p`
  color: #d4d4d4;
  font-size: 12px;
`;
const SocialLinkBar: NextPage = () => {
  return (
    <Container>
      <InfoSection>
        <ProfileImage src="./profile.jpg" alt="pfp" />
        <Title>@memakyou <Verified src="./verified.png" alt="pfp" /></Title>
        <Description>Wouldn't it be cool if we collectively proved a pixel can 'make it'</Description>
      </InfoSection>
      <br />
      <br />
      <br />
      <SocialIcons>
        <IconLink href="http://twitter.com/memakyou">
          <FaTwitter size={30} />
        </IconLink>
        <IconLink href="https://open.spotify.com/artist/6It0hNK9hkFfnm1Qc00gfa">
          <FaSpotify size={30} />
        </IconLink>
        <IconLink href="http://youtube.com/@memakyou">
          <FaYoutube size={30} />
        </IconLink>
        <IconLink href="http://tiktok.com/@memakyou">
          <FaTiktok size={30} />
        </IconLink>
        <IconLink href="http://instagram.com/memakyou">
          <FaInstagram size={30} />
        </IconLink>
        <IconLink href="https://discord.gg/s8KsscTmM5">
          <FaDiscord size={30} />
        </IconLink>
      </SocialIcons>
      <br />
      <br />
      <br />
    </Container>
  );
};

export default SocialLinkBar;
