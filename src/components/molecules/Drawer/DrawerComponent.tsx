import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CreateIcon from '@material-ui/icons/Create';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import Divider from '@material-ui/core/Divider';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Link from 'next/link';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { ActionsList } from '../../../store/ducks/user';
import { ApplicationState } from '../../../store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar as CSSProperties,
  }),
);

const DrawerComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const type = useSelector((state: ApplicationState) => state.user.data.data.type);
  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <Link href="/">
          <ListItem button key="Voltar">
            <ListItemIcon>
              <KeyboardReturnIcon />
            </ListItemIcon>
            <ListItemText primary="Voltar" />
          </ListItem>
        </Link>
        <Link href="/admin/profile">
          <ListItem button key="Meu Perfil">
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Meu Perfil" />
          </ListItem>
        </Link>
        <Link href="/admin/articles/write">
          <ListItem button key="Novo Artigo">
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary="Novo Artigo" />
          </ListItem>
        </Link>
      </List>
      {type === 'admin' && (
        <>
          <Divider />
          <List>
            <Link href="/admin/articles/pending">
              <ListItem button key="Aprovar Artigos">
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Aprovar Artigos" />
              </ListItem>
            </Link>
            <Link href="/admin/articles/all">
              <ListItem button key="Todos os Artigos">
                <ListItemIcon>
                  <ArtTrackIcon />
                </ListItemIcon>
                <ListItemText primary="Todos os Artigos" />
              </ListItem>
            </Link>
          </List>
        </>
      )}
      <Divider />
      <List>
        <ListItem
          button
          key="Sair"
          onClick={() => {
            dispatch(ActionsList.logoutRequest());
          }}
        >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Sair" />
        </ListItem>
      </List>
    </div>
  );
};

export default DrawerComponent;
