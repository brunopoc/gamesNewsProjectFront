import React from 'react';
import { Grid, Box, styled, Avatar } from '@material-ui/core';

const CommentContent = styled(Box)({
  width: '100%',
});

const AvatarContainer = styled(Box)({
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
});

const AvatarStyled = styled(Avatar)({
  border: '2px solid #C13535',
});

const CommentAuthorContainer = styled(Box)({
  fontWeight: '600',
  textTransform: 'uppercase',
  fontSize: '12px',
});

const PostedAt = styled(Box)({
  fontWeight: '600',
  fontSize: '10px',
  color: '#b2b2b2',
  textAlign: 'right',
});

const AnswareButton = styled(Box)({
  fontSize: '14px',
  color: '#858585',
  cursor: 'pointer',
  textAlign: 'left',
});

type authorProps = {
  name: string;
};

type ownProps = {
  author: authorProps;
  commentedAt?: string;
  text: string;
  handleAnsware: (...args: any[]) => void;
};

const CommentFieldComponent = ({ text, commentedAt, author, handleAnsware }: ownProps) => (
  <Grid container spacing={1}>
    <Grid container item xs={3} sm={1}>
      <AvatarContainer>
        <AvatarStyled />
      </AvatarContainer>
    </Grid>
    <Grid container item xs={9} sm={11}>
      <CommentContent>
        <CommentAuthorContainer>{author}</CommentAuthorContainer>
        <PostedAt>{commentedAt}</PostedAt>
        <div>
          <p>{text}</p>
        </div>
        <AnswareButton onClick={handleAnsware}>Responder</AnswareButton>
      </CommentContent>
    </Grid>
  </Grid>
);

export default CommentFieldComponent;
