import React from 'react';
import { Card, Box } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useSelector } from 'react-redux';
import { styled } from '@material-ui/core/styles';
import Link from 'next/link';
import { LoginFormComponent } from '../../molecules';
import { ApplicationState } from '../../../store';

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

const LinkStyled = styled(Box)({
  color: '#738FCE',
  cursor: 'pointer',
});

const LoginCardComponent: React.FC = () => {
  const error = useSelector((state: ApplicationState) => state.user.error);
  return (
    <Card>
      <BoxHeaderStyled component="div">Faça seu login</BoxHeaderStyled>
      <BoxStyled>
        {error === true ? (
          <Alert severity="error">
            Não foi possível fazer o login, usuario e senha podem estar incorreto ou o email
            bloqueado
          </Alert>
        ) : (
          <div />
        )}
        <LoginFormComponent />
        <BoxFooterStyled component="div">
          Ainda não possui uma conta?
          <br />
          <Link href="/register">
            <LinkStyled>Clique aqui e crie uma!</LinkStyled>
          </Link>
        </BoxFooterStyled>
      </BoxStyled>
    </Card>
  );
};

export default LoginCardComponent;
