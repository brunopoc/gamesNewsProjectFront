import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Container, Box, styled } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { AppBarAdminComponent } from '..';
import { ActionsList as CategorieActionList } from '../../../store/ducks/categories';
import { WriteFormComponent } from '../../molecules';
import { withAuthSync } from '../../../utils/auth';

const BoxStyled = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '40px',
});

const WriteCardComponent = () => {
  const dispatch = useDispatch();
  const redirect = useSelector((state: ApplicationState) => state.user.redirect);

  useEffect(() => {
    dispatch(CategorieActionList.listCategoriesRequest());
    withAuthSync(redirect);
  }, []);

  return (
    <AppBarAdminComponent>
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
