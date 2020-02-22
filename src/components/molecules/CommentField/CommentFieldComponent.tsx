import React from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Box, styled, Avatar } from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';
import DeleteIcon from '@material-ui/icons/Delete';
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';
import { ActionsList } from '../../../store/ducks/user';

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

const PostedAt = styled(Box)({
  fontWeight: 600,
  fontSize: '10px',
  color: '#b2b2b2',
  textAlign: 'right',
  width: '100%',
});

const AnswareButton = styled(Box)({
  fontSize: '14px',
  color: '#858585',
  cursor: 'pointer',
});

const TextArea = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '5px',
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
  commentedAt?: string;
  image?: string;
  text: string;
  userType: string;
  logged: boolean;
  idComment: string;
  handleAnsware: (...args: any[]) => void;
  handleDeleteComment: (...args: any[]) => void;
  handleOpen: (...args: any[]) => void;
};

const CommentFieldComponent = ({
  text,
  commentedAt,
  author,
  handleAnsware,
  image,
  userType,
  logged,
  handleDeleteComment,
  idComment,
  handleOpen,
}: ownProps) => {
  const dispatch = useDispatch();
  const handleBlock = (id: string, blocked: boolean) => {
    dispatch(ActionsList.blockRequest(id, blocked));
  };

  return (
    <Grid container spacing={1}>
      <Grid container item xs={3} sm={1}>
        <AvatarContainer>
          <AvatarStyled src={image} alt="Foto de perfil" />
        </AvatarContainer>
      </Grid>
      <Grid container item xs={9} sm={11}>
        <CommentContent>
          <Grid container spacing={1}>
            <Grid container item xs={8}>
              <CommentAuthorContainer>{author.name}</CommentAuthorContainer>
            </Grid>
            <Grid container item xs={4}>
              <PostedAt>{commentedAt}</PostedAt>
            </Grid>
            <Grid container item xs={11}>
              <TextArea>
                <PharagraphArea component="p">{text}</PharagraphArea>
                {logged && <AnswareButton onClick={handleAnsware}>Responder</AnswareButton>}
              </TextArea>
            </Grid>
            <Grid container item xs={1}>
              {userType === 'admin' && (
                <div>
                  <BlockIconStyled onClick={() => handleBlock(author.id, true)} />
                  <DeleteIconStyled onClick={() => handleDeleteComment(idComment)} />
                </div>
              )}
              {logged && (
                <div>
                  <EmojiFlagsIconStyled
                    onClick={() => {
                      handleOpen({ accused: author, refer: { type: 'comment', id: idComment } });
                    }}
                  />
                </div>
              )}
            </Grid>
          </Grid>
        </CommentContent>
      </Grid>
    </Grid>
  );
};

export default CommentFieldComponent;
