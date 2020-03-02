import React from 'react';
import { Container, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { LoginCardComponent, HeadComponent } from '../../src/components/organisms';
import Header from '../../src/components/organisms/Header/HeaderComponent';
import { ActionsList as CategoriesActionList } from '../../src/store/ducks/categories';

const BoxStyled = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '40px',
});

const Login = () => (
  <div>
    <HeadComponent
      title="Faça o seu Login - Sou Gamer Com Orgulho"
      description="Procurando noticias sobre o mundo dos games? Então veio ao lugar certo! Sou Gamer Com Orgulho é um portal onde os próprios leitores podem escrever a matéria. Venha fazer parte da nossa comunidade!"
      url="https://www.sougamercomorgulho.com.br"
      image="https://gameapi-upload.s3.amazonaws.com/137293.jpg"
    />
    <Header />
    <Container fixed>
      <BoxStyled component="div">
        <LoginCardComponent />
      </BoxStyled>
    </Container>
  </div>
);

Login.getInitialProps = async ({ store }) => {
  store.dispatch(CategoriesActionList.listCategoriesRequest());
};

export default Login;
