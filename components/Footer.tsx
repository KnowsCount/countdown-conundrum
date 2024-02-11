import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  color: #212529;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
`;

const SocialLinks = styled.div`
  a {
    margin: 0 10px;
    color: #212529;
    text-decoration: none;

    &:hover {
      color: #007bff;
    }
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <SocialLinks>
        <a href="https://github.com/knowscount" target="_blank" rel="noopener noreferrer">GitHub</a>
      </SocialLinks>
    </FooterContainer>
  );
}

export default Footer;
