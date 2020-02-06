import React from 'react';
import { Button, styled } from '@material-ui/core';

const ColorButton = styled(Button)({
  color: '#fff',
  backgroundColor: '#111111',
  '&:hover': {
    backgroundColor: '#1B1B1B',
  },
});

const Send: React.FC = ({ children }) => {
  return (
    <ColorButton variant="contained" color="primary" type="submit">
      {children}
    </ColorButton>
  );
};

export default Send;
