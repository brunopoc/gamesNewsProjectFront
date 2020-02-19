import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  styled,
} from '@material-ui/core';
import ReactPaginate from 'react-paginate';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Link from 'next/link';
import { ApplicationState } from '../../../src/store';
import { AppBarAdminComponent } from '../../../src/components/organisms';
import { ActionsList } from '../../../src/store/ducks/articles';
import TitleComponent from '../../../src/components/atoms/Title/TitleComponent';
import { adminOnly } from '../../../src/utils/auth';

const TitleLabel = styled(Box)({
  width: '100%',
  color: '#636363',
  fontWeight: 600,
  textTransform: 'uppercase',
  marginBottom: '10px',
});

const ActionArea = styled(Box)({
  cursor: 'pointer',
});

const ActionContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
});

const TableCellArea = styled(TableCell)({
  cursor: 'pointer',
  textAlign: 'left',
  display: 'table-cell',
  padding: '16px',
  fontSize: '0.875rem',
  fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  fontWeight: 400,
  lineHeight: '1.43',
  borderBottom: '1px solid rgba(224, 224, 224, 1)',
  letterSpacing: '0.01071em',
  verticalAlign: 'inherit',
});

const TableStyled = styled(Table)({
  minWidth: 650,
});

const Pending = () => {
  const dispatch = useDispatch();
  const { currentPendingPage, pending, totalOfPendingPages } = useSelector(
    (state: ApplicationState) => state.articles,
  );
  const type = useSelector((state: ApplicationState) => state.user.data.data.type);

  useEffect(() => {
    adminOnly(false, type);
    dispatch(ActionsList.pendingArticleRequest(currentPendingPage));
  }, []);

  const handlePageClick = data => {
    const selected = data.selected + 1;
    dispatch(ActionsList.pendingArticleRequest(selected));
  };

  const handlePostAprove = (id, aprove) => {
    dispatch(ActionsList.aproveArticleUpdateRequest({ id, aprove, section: 'pending' }));
  };

  const handleOnClickPost = post => {
    dispatch(ActionsList.loadEditableArticle(post));
  };

  const initPage = currentPendingPage - 1;
  return (
    <AppBarAdminComponent>
      <TitleComponent text="Aprovar Artigos" />
      <Container fixed>
        <TitleLabel>Lista dos artigos para aprovação</TitleLabel>
        <TableContainer component={Paper}>
          <TableStyled aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Titulo</TableCell>
                <TableCell align="right">Autor</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pending?.map(post => (
                <TableRow key={post.id}>
                  <Link href="/admin/articles/update">
                    <TableCellArea
                      onClick={() => handleOnClickPost(post)}
                      component="th"
                      scope="row"
                    >
                      {post.title}
                    </TableCellArea>
                  </Link>
                  <TableCell align="right">{post.author?.name}</TableCell>
                  <TableCell align="right">
                    <ActionContainer>
                      <ActionArea onClick={() => handlePostAprove(post.id, 'aproved')}>
                        <CheckCircleIcon />
                      </ActionArea>
                      <ActionArea onClick={() => handlePostAprove(post.id, 'rejected')}>
                        <HighlightOffIcon />
                      </ActionArea>
                    </ActionContainer>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableStyled>
        </TableContainer>
        <ReactPaginate
          previousLabel="Anterior"
          nextLabel="Próximo"
          breakLabel="..."
          breakClassName="break-me"
          pageCount={totalOfPendingPages}
          initialPage={initPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          subContainerClassName="pages pagination"
          activeClassName="active"
        />
      </Container>
    </AppBarAdminComponent>
  );
};

export default Pending;
