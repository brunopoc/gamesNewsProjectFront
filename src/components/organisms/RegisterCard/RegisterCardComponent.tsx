import React from 'react';
import { Card, Box } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useSelector } from 'react-redux';
import { styled } from '@material-ui/core/styles';
import { RegisterFormComponent } from '../../molecules';
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

const RegisterCardComponent: React.FC = () => {
  const error = useSelector((state: ApplicationState) => state.register.error);
  return (
    <Card>
      <BoxHeaderStyled component="div">
        Crie uma conta e faça parte da nossa comunidade!
      </BoxHeaderStyled>
      <BoxStyled>
        {error && <Alert severity="error">Email já cadastrado</Alert>}
        <RegisterFormComponent />
      </BoxStyled>
    </Card>
  );
};

export default RegisterCardComponent;
