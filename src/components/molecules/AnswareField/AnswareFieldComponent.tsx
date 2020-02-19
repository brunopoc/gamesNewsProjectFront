import React from 'react';
import { Grid, Box, styled, Avatar } from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';
import DeleteIcon from '@material-ui/icons/Delete';
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';

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

const PharagraphArea = styled(Box)({
  marginTop: '0px',
});

const BlockIconStyled = styled(BlockIcon)({
  width: '12px',
  cursor: 'pointer',
});

const DeleteIconStyled = styled(DeleteIcon)({
  width: '12px',
  cursor: 'pointer',
});

const TitleArea = styled(Box)({
  diplay: 'flex',
  flexDirection: 'column',
});

const EmojiFlagsIconStyled = styled(EmojiFlagsIcon)({
  width: '12px',
  cursor: 'pointer',
});

type authorProps = {
  name: string;
  id: string;
};

type ownProps = {
  author: authorProps;
  commentID: string;
  answareID: string;
  commentedAt?: string;
  image?: string;
  text: string;
  userType: string;
  logged: boolean;
  handleBlock: (...args: any[]) => void;
  handleDeleteAnsware: (...args: any[]) => void;
  handleOpen: (...args: any[]) => void;
};

const AnswareFieldComponent = ({
  text,
  commentedAt,
  author,
  image,
  userType,
  handleBlock,
  commentID,
  handleDeleteAnsware,
  answareID,
  handleOpen,
  logged,
}: ownProps) => (
  <CommentContainer>
    <Grid container spacing={1}>
      <Grid container item xs={3} sm={1}>
        <AvatarContainer>
          <AvatarStyled src={image} alt="Foto de perfil" />
        </AvatarContainer>
      </Grid>
      <Grid container item xs={9} sm={11}>
        <CommentContent>
          <Grid container spacing={1}>
            <Grid container item xs={12}>
              <TitleArea>
                <CommentAuthorContainer>{author?.name}</CommentAuthorContainer>
                <PostedAtAnsware>
                  <div>{`Em respota, ${commentedAt}`}</div>
                </PostedAtAnsware>
              </TitleArea>
            </Grid>
            <Grid container item xs={11}>
              <PharagraphArea component="p">{text}</PharagraphArea>
            </Grid>
            <Grid container item xs={1}>
              {userType === 'admin' && (
                <div>
                  <BlockIconStyled onClick={() => handleBlock(author.id, true)} />
                  <DeleteIconStyled onClick={() => handleDeleteAnsware(commentID, answareID)} />
                </div>
              )}
              {logged && (
                <div>
                  <EmojiFlagsIconStyled
                    onClick={() => {
                      handleOpen({ accused: author, refer: { type: 'answare', id: commentID } });
                    }}
                  />
                </div>
              )}
            </Grid>
          </Grid>
        </CommentContent>
      </Grid>
    </Grid>
  </CommentContainer>
);

export default AnswareFieldComponent;
