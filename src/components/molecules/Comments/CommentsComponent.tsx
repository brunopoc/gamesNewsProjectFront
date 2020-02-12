import React, { useReducer } from 'react';
import { Formik } from 'formik';
import { Grid, Box, styled, Divider } from '@material-ui/core';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { ActionsList, Comment } from '../../../store/ducks/articles';
import Text from '../../atoms/Inputs/Text';
import Send from '../../atoms/Buttons/Send';
import { ApplicationState } from '../../../store';

const Content = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  marginTop: '20px',
  padding: '5px',
  width: '100%',
});

const CommentContent = styled(Box)({
  width: '100%',
});

const CommentSection = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  marginTop: '20px',
  padding: '5px',
  width: '100%',
});

const AnswareSection = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  marginTop: '10px',
  marginLeft: '20px',
  padding: '5px',
  width: '100%',
});

const AnswareButton = styled(Box)({
  fontSize: '14px',
  color: '#858585',
  cursor: 'pointer',
  textAlign: 'right',
});

const CommentContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  marginTop: '20px',
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
  alignItems: 'flex-end',
  display: 'flex',
  flexDirection: 'column',
});

type OwnProps = {
  comments: Comment[];
  articleID: number;
};

const CommentsComponent = (props: OwnProps) => {
  const dispatch = useDispatch();
  const { comments, articleID } = props;
  const { id, name } = useSelector((state: ApplicationState) => state.user.data.data);

  const [answareForm, dispatchAnswareForm] = useReducer((myArray, { type, value }) => {
    switch (type) {
      case 'add':
        return [...myArray, value];
      case 'remove':
        return myArray.filter((_, index) => index !== value);
      default:
        return myArray;
    }
  }, []);

  function handleCommentFormikSubmit(values) {
    comments.push({ text: values.comment, author: { id, name } });
    const data = { comments, articleID };
    dispatch(ActionsList.articleCommentRequest(data));
  }

  function handleAnsware(idComment: string) {
    if (answareForm.indexOf(idComment) <= -1) {
      dispatchAnswareForm({ type: 'add', value: idComment });
    }
  }

  function handleAnswareFormikSubmit(values, idComment) {
    comments.map(comment => {
      if (comment._id == idComment) {
        const temp = comment.answares || [];
        temp.push({ text: values.answare, author: { id, name } });
        return { ...comment, answares: temp };
      }
      return comment;
    });
    const data = { comments, articleID };
    dispatch(ActionsList.articleCommentRequest(data));
  }

  return (
    <Content>
      <Formik
        initialValues={{ comment: '' }}
        validationSchema={Yup.object().shape({
          comment: Yup.string().required('Por favor, digite o texto que quer comentar'),
        })}
        onSubmit={handleCommentFormikSubmit}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid container item sm={9}>
                <FieldContainer>
                  <Text
                    value={values.comment}
                    name="comment"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Digite seu comentário :"
                    placeholder="Digite seu comentário ..."
                  />
                </FieldContainer>
              </Grid>
              <Grid container item sm={3}>
                <ButtonContainer>
                  <Send> Comentar </Send>
                </ButtonContainer>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
      <CommentSection>
        {comments &&
          comments.map(comment => (
            <div key={comment._id}>
              <Divider />
              <CommentContainer>
                <Grid container spacing={1}>
                  <Grid container item sm={2}>
                    IMG
                  </Grid>
                  <Grid container item sm={10}>
                    <CommentContent>
                      <div>{comment.author?.name}</div>
                      <div>
                        <p>{comment.text}</p>
                      </div>
                      <AnswareButton onClick={() => handleAnsware(comment._id)}>
                        Responder
                      </AnswareButton>
                    </CommentContent>
                  </Grid>
                </Grid>
                <AnswareSection>
                  {comment.answares &&
                    comment.answares.map(answare => (
                      <CommentContainer key={answare._id}>
                        <Grid container spacing={1}>
                          <Grid container item sm={2}>
                            IMG
                          </Grid>
                          <Grid container item sm={10}>
                            <p>{answare.text}</p>
                          </Grid>
                        </Grid>
                      </CommentContainer>
                    ))}
                  {answareForm.indexOf(comment._id) > -1 && (
                    <Formik
                      initialValues={{ answare: '' }}
                      validationSchema={Yup.object().shape({
                        answare: Yup.string().required(
                          'Por favor, digite o texto que quer comentar',
                        ),
                      })}
                      onSubmit={values => handleAnswareFormikSubmit(values, comment._id)}
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
              </CommentContainer>
            </div>
          ))}
      </CommentSection>
    </Content>
  );
};

export default CommentsComponent;
