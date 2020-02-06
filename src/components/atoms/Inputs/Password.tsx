import React from 'react';
import { TextField } from '@material-ui/core';

interface OwnProps {
  label?: string;
  name?: string;
  placeholder?: string;
  onChange?: (...args: any[]) => void;
  onBlur?: (...args: any[]) => void;
  value?: string;
}

const Password: React.FC<OwnProps> = props => {
  const { label, placeholder, onChange, value, onBlur, name } = props;
  return (
    <TextField
      style={{ width: '100%' }}
      label={label}
      onChange={onChange}
      value={value}
      onBlur={onBlur}
      name={name}
      type="password"
      placeholder={placeholder}
    />
  );
};

export default Password;
