import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBarListComponent } from '../../molecules';

const AppBarComponent = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (value: boolean) => {
    setOpen(value);
  };

  return (
    <div>
      <IconButton onClick={() => toggleDrawer(true)} edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={() => toggleDrawer(false)}>
        <AppBarListComponent toggleDrawer={toggleDrawer} />
      </Drawer>
    </div>
  );
};

export default AppBarComponent;
