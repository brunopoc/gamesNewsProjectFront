import React, { useReducer, useState } from 'react';
import { Formik } from 'formik';
import { Grid, Box, styled, Divider, Card, CardContent } from '@material-ui/core';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { ActionsList, Comment } from '../../../store/ducks/articles';
import Text from '../../atoms/Inputs/Text';
import Send from '../../atoms/Buttons/Send';
import { ApplicationState } from '../../../store';
import { FromNow } from '../../../utils/moment';
import { CommentFieldComponent } from '../../molecules';
import { AnswaresComponent } from '..';

const Content = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  marginTop: '20px',
  padding: '5px',
  width: '100%',
});

const CommentSection = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  marginTop: '10px',
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

type OwnProps = {
  comments: Comment[];
  articleID: number;
};

const CommentsComponent = (props: OwnProps) => {
  const dispatch = useDispatch();
  const { comments, articleID } = props;
  const { id, name } = useSelector((state: ApplicationState) => state.user.data.data);
  const { logged } = useSelector((state: ApplicationState) => state.user);
  const [limit, setLimit] = useState(2);
  const [newComment, setNewComment] = useState({});

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

  const [loadMore, dispatchLoadMore] = useReducer((myArray, { type, value }) => {
    switch (type) {
      case 'add':
        return [...myArray, value];
      case 'remove':
        return myArray.filter((_, index) => index !== value);
      default:
        return myArray;
    }
  }, []);

  function handleCommentFormikSubmit(values, { resetForm }) {
    resetForm({});
    comments.unshift({ text: values.comment, author: { id, name } });
    const data = { comments, articleID };
    dispatch(ActionsList.articleCommentRequest(data));
  }

  function handleAnsware(idComment: string) {
    if (answareForm.indexOf(idComment) <= -1) {
      dispatchAnswareForm({ type: 'add', value: idComment });
    }
  }

  function handleLoadMore(idAnsware: string) {
    if (loadMore.indexOf(idAnsware) <= -1) {
      dispatchLoadMore({ type: 'add', value: idAnsware });
    }
  }

  function handleAnswareFormikSubmit(values, idComment) {
    comments.map(comment => {
      if (comment._id == idComment) {
        const temp = comment.answares || [];
        setNewComment({ text: values.answare, author: { id, name }, id: idComment });
        temp.push({ text: values.answare, author: { id, name } });
        return { ...comment, answares: temp };
      }
      return comment;
    });
    const data = { comments, articleID };
    dispatch(ActionsList.articleCommentRequest(data));
  }

  return (
    <Content id="comments">
      <Card>
        <CardContent>
          {logged ? (
            <>
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
                        <CommentFieldComponent
                          text={comment.text}
                          author={comment.author.name}
                          commentedAt={FromNow(comment.commentedAt)}
                          handleAnsware={() => handleAnsware(comment._id)}
                        />
                        <AnswaresComponent
                          answares={comment.answares}
                          commentID={comment._id}
                          newComment={newComment}
                          userID={id}
                          limit={limit}
                          loadMore={loadMore}
                          handleAnswareFormikSubmit={handleAnswareFormikSubmit}
                          handleLoadMore={handleLoadMore}
                          setLimit={setLimit}
                          answareForm={answareForm}
                        />
                      </CommentContainer>
                    </div>
                  ))}
              </CommentSection>
            </>
          ) : (
            <div> Faça o seu Login para continuar ou Crie uma conta para comentar </div>
          )}
        </CardContent>
      </Card>
    </Content>
  );
};

export default CommentsComponent;
