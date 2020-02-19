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
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Link from 'next/link';
import { ApplicationState } from '../../../src/store';
import { AppBarAdminComponent } from '../../../src/components/organisms';
import { ActionsList } from '../../../src/store/ducks/articles';
import TitleComponent from '../../../src/components/atoms/Title/TitleComponent';
import { withAuthSync } from '../../../src/utils/auth';

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

const Personal = () => {
  const dispatch = useDispatch();
  const { currentPersonalPage, personalPosts, totalOfPersonalPages } = useSelector(
    (state: ApplicationState) => state.articles,
  );

  const { id } = useSelector((state: ApplicationState) => state.user.data.data);

  useEffect(() => {
    withAuthSync(false);
    dispatch(ActionsList.personalArticleRequest(currentPersonalPage, id));
  }, []);

  const handlePageClick = data => {
    const selected = data.selected + 1;
    dispatch(ActionsList.personalArticleRequest(selected, id));
  };

  const handlePostAprove = (idPost: string, aprove) => {
    dispatch(ActionsList.aproveArticleUpdateRequest({ id: idPost, aprove, section: 'personal' }));
  };

  const handleOnClickPost = post => {
    dispatch(ActionsList.loadEditableArticle(post));
  };

  const initPage = currentPersonalPage - 1;
  return (
    <AppBarAdminComponent>
      <TitleComponent text="Meus Artigos" />
      <Container fixed>
        <TitleLabel>Lista com todos os artigos já escritos</TitleLabel>
        <TableContainer component={Paper}>
          <TableStyled aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Titulo</TableCell>
                <TableCell align="right">Editar</TableCell>
                <TableCell align="right">Excluir</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {personalPosts?.map(post => (
                <TableRow key={post.id}>
                  <TableCellArea component="th" scope="row">
                    {post.title}
                  </TableCellArea>
                  <TableCell align="right">
                    <ActionContainer>
                      <ActionArea onClick={() => handleOnClickPost(post)}>
                        <Link href="/admin/articles/update">
                          <EditIcon />
                        </Link>
                      </ActionArea>
                    </ActionContainer>
                  </TableCell>
                  <TableCell align="right">
                    <ActionContainer>
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
          pageCount={totalOfPersonalPages}
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

export default Personal;
