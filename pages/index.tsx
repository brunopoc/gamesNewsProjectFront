import React, { useEffect } from 'react';
import { Container, Box, Grid, Card } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@material-ui/core/styles';
import ReactPaginate from 'react-paginate';
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
  const { list, currentPage, totalOfPages } = useSelector(
    (state: ApplicationState) => state.articles,
  );
  useEffect(() => {
    dispatch(ActionsList.articleListRequest(currentPage));
  }, []);

  const handlePageClick = data => {
    const selected = data.selected + 1;
    dispatch(ActionsList.articleListRequest(selected));
  };
  const initPage = parseInt(currentPage, 10) - 1;
  return (
    <div>
      <Header />
      <Container fixed>
        <Main>
          <Grid container spacing={2}>
            <Grid container item md={8}>
              <Grid container item md={12}>
                <ArticlesComponent articles={list} />
              </Grid>
              <Grid container item md={12}>
                <ReactPaginate
                  previousLabel="Anterior"
                  nextLabel="Próximo"
                  breakLabel="..."
                  breakClassName="break-me"
                  pageCount={totalOfPages}
                  initialPage={initPage}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName="pagination"
                  subContainerClassName="pages pagination"
                  activeClassName="active"
                />
              </Grid>
            </Grid>
            <Grid container item md={4}>
              <CardStyled> - Assuntos em Alta - </CardStyled>
            </Grid>
          </Grid>
        </Main>
        <style jsx global>
          {`
            .pagination {
              display: inline-block;
              padding-left: 15px;
              padding-right: 15px;
              margin: 40px auto;
            }

            .pagination li {
              display: inline-block;
              background-color: #000;
              padding: 15px 0px;
              margin: 5px;
              color: #fff;
              border-radius: 5px;
            }
            .pagination li a {
              padding: 15px;
              margin: 5px;
            }
            .pagination li a:hover {
              cursor: pointer;
            }
            .pagination .active {
              background-color: #fff;
              color: #000;
              border: 1px solid #000;
            }
          `}
        </style>
      </Container>
    </div>
  );
};

export default Index;
