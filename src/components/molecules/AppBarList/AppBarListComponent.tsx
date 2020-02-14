import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { MenuItemsComponent } from '..';

type OwnProps = {
  toggleDrawer: (...args: any[]) => void;
};

const AppBarListComponent = ({ toggleDrawer }: OwnProps) => {
  return (
    <div
      role="presentation"
      onClick={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
    >
      <MenuItemsComponent direction="vertical" />
    </div>
  );
};

export default AppBarListComponent;
