import React from 'react';
import { Container, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import LoginCard from '../../src/components/organisms/LoginCard';

const BoxStyled  = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '40px',
});


const Login: React.FC = () => (
  <Container fixed>
    <BoxStyled  component="div">
      <LoginCard />
    </BoxStyled >
  </Container>
);

export default Login;
