import React, { useEffect } from 'react';
import { Container, Box, Grid, Card } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@material-ui/core/styles';
import ArticlesComponent from '../src/components/organisms/Articles/ArticlesComponent';
import Header from '../src/components/organisms/Header/HeaderComponent';
import { ApplicationState } from '../src/store';
import { ActionsList } from '../src/store/ducks/articles';

const Main = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '40px',
});

const CardStyled = styled(Card)({
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
});

const Index = () => {
  const dispatch = useDispatch();
  const { list, currentPage } = useSelector((state: ApplicationState) => state.articles);
  useEffect(() => {
    dispatch(ActionsList.articleListRequest(currentPage));
  }, []);
  return (
    <div>
      <Header />
      <Container fixed>
        <Main>
          <Grid container spacing={2}>
            <Grid container item md={8}>
              <ArticlesComponent articles={list} />
            </Grid>
            <Grid container item md={4}>
              <CardStyled> - Assuntos em Alta - </CardStyled>
            </Grid>
          </Grid>
        </Main>
      </Container>
    </div>
  );
};

export default Index;
