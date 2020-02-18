import React from 'react';
import { styled, Box, Divider } from '@material-ui/core';

const TitleContainer = styled(Box)({
  width: '100%',
  color: '#343434',
  fontWeight: 600,
  fontSize: '18px',
  marginBottom: '5px',
});

const TextContainer = styled(Box)({
  margin: '10px 0px',
});

type OwnProps = {
  text: string;
};

const TitleComponent = ({ text }: OwnProps) => {
  return (
    <TitleContainer>
      <TextContainer>{text}</TextContainer>
      <Divider />
    </TitleContainer>
  );
};

export default TitleComponent;
