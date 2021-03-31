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
import BlockIcon from '@material-ui/icons/Block';
import Link from 'next/link';
import { ApplicationState } from '../../../store';
import { AppBarAdminComponent } from '../../../components/organisms';
import { ActionsList } from '../../../store/ducks/user';
import TitleComponent from '../../../components/atoms/Title/TitleComponent';
import { adminOnly } from '../../../utils/auth';

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

const Users = () => {
  const dispatch = useDispatch();
  const { currentUsersPage, users, totalOfUsers } = useSelector(
    (state: ApplicationState) => state.user.data,
  );
  const type = useSelector((state: ApplicationState) => state.user.data.data.type);

  useEffect(() => {
    adminOnly(false, type);
    dispatch(ActionsList.listUsersRequest(currentUsersPage));
  }, []);

  const handlePageClick = data => {
    const selected = data.selected + 1;
    dispatch(ActionsList.listUsersRequest(selected));
  };

  const handleUserBlock = (id, blocked) => {
    dispatch(ActionsList.blockRequest(id, blocked));
  };

  const initPage = currentUsersPage - 1;
  return (
    <AppBarAdminComponent>
      <TitleComponent text="Todos os Usuarios" />
      <Container fixed>
        <TitleLabel>Lista com todos os Usuarios</TitleLabel>
        <TableContainer component={Paper}>
          <TableStyled aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!users &&
                users.map(user => (
                  <TableRow key={user.id}>
                    <Link href="/admin/articles/update">
                      <TableCellArea component="th" scope="row">
                        {user.name}
                      </TableCellArea>
                    </Link>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">{user.blocked ? 'Bloqueado' : 'Normal'}</TableCell>
                    <TableCell align="right">
                      <ActionContainer>
                        <ActionArea onClick={() => handleUserBlock(user.id, !user.blocked)}>
                          <BlockIcon />
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
          pageCount={totalOfUsers}
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

export default Users;
