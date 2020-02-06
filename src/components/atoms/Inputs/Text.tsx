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

const Text: React.FC<OwnProps> = props => {
  const { label, placeholder, onChange, value, name, onBlur } = props;
  return (
    <div>
      <TextField
        label={label}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Text;
