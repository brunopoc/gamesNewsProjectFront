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
  fontWeight: 600,
  textTransform: 'uppercase',
  fontSize: '12px',
});

const CommentContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  marginTop: '5px',
  padding: '10px',
  width: '100%',
});

const PostedAtAnsware = styled(Box)({
  fontWeight: 600,
  fontSize: '10px',
  color: '#b2b2b2',
  textAlign: 'left',
});

type authorProps = {
  name: string;
};

type ownProps = {
  author: authorProps;
  commentedAt?: string;
  text: string;
  id: string;
};

const AnswareFieldComponent = ({ text, commentedAt, author, id }: ownProps) => (
  <CommentContainer key={id}>
    <Grid container spacing={1}>
      <Grid container item xs={3} sm={1}>
        <AvatarContainer>
          <AvatarStyled />
        </AvatarContainer>
      </Grid>
      <Grid container item xs={9} sm={11}>
        <CommentContent>
          <CommentAuthorContainer>{author?.name}</CommentAuthorContainer>
          <PostedAtAnsware>{`Em respota, ${commentedAt}`}</PostedAtAnsware>
          <div>
            <p>{text}</p>
          </div>
        </CommentContent>
      </Grid>
    </Grid>
  </CommentContainer>
);

export default AnswareFieldComponent;
