import React from 'react';
import { Container, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { RegisterCardComponent } from '../../src/components/organisms';

const BoxStyled = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '40px',
});

const Register: React.FC = () => (
  <Container fixed>
    <BoxStyled component="div">
      <RegisterCardComponent />
    </BoxStyled>
  </Container>
);

export default Register;
