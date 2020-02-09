import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CreateIcon from '@material-ui/icons/Create';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import Divider from '@material-ui/core/Divider';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Link from 'next/link';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar as CSSProperties,
  }),
);

const DrawerComponent = () => {
  const classes = useStyles();
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
        <Link href="/">
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
      <Divider />
      <List>
        <ListItem button key="Sair">
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
