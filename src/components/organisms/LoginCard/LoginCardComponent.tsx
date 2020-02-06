import React from 'react';
import { Card, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Link from 'next/link';
import { LoginFormComponent } from '../../molecules';

const BoxStyled = styled(Box)({
  padding: '20px',
});

const BoxHeaderStyled = styled(Box)({
  width: '100%',
  padding: '20px',
  textAlign: 'center',
  backgroundColor: '#000',
  color: '#fff',
  fontWeight: 800,
  fontSize: '18px',
});

const BoxFooterStyled = styled(Box)({
  marginTop: '10px',
});

const LoginCardComponent: React.FC = () => (
  <Card>
    <BoxHeaderStyled component="div">Faça seu login</BoxHeaderStyled>
    <BoxStyled>
      <LoginFormComponent />
      <BoxFooterStyled component="div">
        Ainda não possui uma conta?
        <br />
        <Link href="/register"> Clique aqui e cria uma!</Link>
      </BoxFooterStyled>
    </BoxStyled>
  </Card>
);

export default LoginCardComponent;
