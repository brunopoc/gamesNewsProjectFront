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

const Email: React.FC<OwnProps> = props => {
  const { label, placeholder, onChange, value, name, onBlur } = props;
  return (
    <TextField
      style={{ width: '100%' }}
      label={label}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      name={name}
      type="email"
      placeholder={placeholder}
    />
  );
};

export default Email;
