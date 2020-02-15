import React from 'react';
import { Formik } from 'formik';
import { Grid, Box, styled, Avatar } from '@material-ui/core';
import * as Yup from 'yup';
import { Answare } from '../../../store/ducks/articles';
import Text from '../../atoms/Inputs/Text';
import Send from '../../atoms/Buttons/Send';
import { FromNow } from '../../../utils/moment';
import { AnswareFieldComponent } from '../../molecules';

const CommentContent = styled(Box)({
  width: '100%',
});

const AnswareSection = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  marginLeft: '20px',
  padding: '5px',
  width: '100%',
});

const CommentContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  marginTop: '5px',
  padding: '10px',
  width: '100%',
});

const FieldContainer = styled(Box)({
  height: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  flexDirection: 'column',
});

const ButtonContainer = styled(Box)({
  height: '40px',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'flex-end',
  display: 'flex',
  flexDirection: 'column',
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

const LoadMoreStyled = styled(Box)({
  color: '#b2b2b2',
  fontWeight: '600',
  width: '100%',
  textAlign: 'center',
  cursor: 'pointer',
});

const CommentAuthorContainer = styled(Box)({
  fontWeight: '600',
  textTransform: 'uppercase',
  fontSize: '12px',
});

const PostedAtAnsware = styled(Box)({
  fontWeight: '600',
  fontSize: '10px',
  color: '#b2b2b2',
  textAlign: 'left',
});

type OwnProps = {
  answares: Answare[];
  commentID: string;
  limit: number;
  userID: string;
  loadMore: any[];
  answareForm: any[];
  newComment: any;
  handleAnswareFormikSubmit: (...args: any[]) => void;
  handleLoadMore: (...args: any[]) => void;
  setLimit: (...args: any[]) => void;
};

const AnswaresComponent = ({
  answares,
  commentID,
  newComment,
  userID,
  limit,
  loadMore,
  handleAnswareFormikSubmit,
  handleLoadMore,
  setLimit,
  answareForm,
}: OwnProps) => (
  <AnswareSection>
    {answares &&
      answares.map((answare, index) => {
        const loadAll = loadMore.indexOf(commentID) <= -1;
        if (!loadAll || limit > index) {
          if (answare.author.id === userID && limit < index && loadAll) {
            setLimit(limit + 1);
          }
          return (
            <AnswareFieldComponent
              text={answare.text}
              author={{ name: answare.author.name }}
              commentedAt={FromNow(answare.commentedAt)}
              id={commentID}
            />
          );
        }
        if (limit == index) {
          return (
            <div key="temp">
              {newComment.id === commentID && (
                <CommentContainer>
                  <Grid container spacing={1}>
                    <Grid container item xs={3} sm={1}>
                      <AvatarContainer>
                        <AvatarStyled />
                      </AvatarContainer>
                    </Grid>
                    <Grid container item xs={9} sm={11}>
                      <CommentContent>
                        <CommentAuthorContainer>{newComment.author?.name}</CommentAuthorContainer>
                        <PostedAtAnsware>
                          {`Em respota, ${FromNow(newComment?.commentedAt)}`}
                        </PostedAtAnsware>
                        <div>
                          <p>{newComment.text}</p>
                        </div>
                      </CommentContent>
                    </Grid>
                  </Grid>
                </CommentContainer>
              )}
              <LoadMoreStyled onClick={() => handleLoadMore(commentID)}>
                ... Carregar Mais ...
              </LoadMoreStyled>
            </div>
          );
        }
      })}
    {answareForm.indexOf(commentID) > -1 && (
      <Formik
        initialValues={{ answare: '' }}
        validationSchema={Yup.object().shape({
          answare: Yup.string().required('Por favor, digite o texto que quer comentar'),
        })}
        onSubmit={(values, { resetForm }) => {
          resetForm({});
          handleAnswareFormikSubmit(values, commentID);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid container item sm={8}>
                <FieldContainer>
                  <Text
                    value={values.answare}
                    name="answare"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Digite sua resposta :"
                    placeholder="Digite sua resposta ..."
                  />
                </FieldContainer>
              </Grid>
              <Grid container item sm={4}>
                <ButtonContainer>
                  <Send> Comentar </Send>
                </ButtonContainer>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    )}
  </AnswareSection>
);

export default AnswaresComponent;
