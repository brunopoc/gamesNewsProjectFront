import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Container, Box, styled } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { AppBarAdminComponent } from '..';
import { ActionsList as CategorieActionList } from '../../../store/ducks/categories';
import { WriteFormComponent } from '../../molecules';
import { withAuthSync } from '../../../utils/auth';
import TitleComponent from '../../atoms/Title/TitleComponent';

const BoxStyled = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '40px',
});

const WriteCardComponent = () => {
  const dispatch = useDispatch();
  const redirect = useSelector((state: any) => state.user.redirect);

  useEffect(() => {
    setTimeout(() => {
      dispatch(CategorieActionList.listCategoriesRequest());
    }, 3000);
    withAuthSync(redirect);
  }, []);

  return (
    <AppBarAdminComponent>
      <TitleComponent text="Escreva o seu artigo: " />
      <Container fixed>
        <Typography paragraph>
          Aqui voce pode escrever artigos, e apos uma analise, nos publicamos o seu artigo no site!
        </Typography>
        <BoxStyled component="div">
          <WriteFormComponent />
        </BoxStyled>
      </Container>
    </AppBarAdminComponent>
  );
};

export default WriteCardComponent;
