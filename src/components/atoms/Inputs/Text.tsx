import React from 'react';
import { TextInput, LabelText } from '../../../styles/components/atoms/Inputs/text';

interface OwnProps {
  label?: string;
  placeholder?: string;
  onChange?: (...args: any[]) => void;
  value?: string;
}

const Text: React.FC<OwnProps> = props => {
  const { label, placeholder, onChange, value } = props;
  return (
    <div>
      {label && <LabelText>{label}</LabelText>}
      <TextInput onChange={onChange} value={value} type="text" placeholder={placeholder} />
    </div>
  );
};

export default Text;
