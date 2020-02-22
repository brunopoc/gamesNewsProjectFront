import React, { useReducer, useState } from 'react';
import { Formik } from 'formik';
import { Grid, Box, styled, Divider, Card, CardContent } from '@material-ui/core';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { ActionsList, Comment } from '../../../store/ducks/articles';
import { ActionsList as ComplaintsActionList } from '../../../store/ducks/complaints';
import Text from '../../atoms/Inputs/Text';
import Send from '../../atoms/Buttons/Send';
import { ApplicationState } from '../../../store';
import { FromNow } from '../../../utils/moment';
import { CommentFieldComponent, SpringModalComponent } from '../../molecules';
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
  articleID: string;
};

const CommentsComponent = (props: OwnProps) => {
  const dispatch = useDispatch();
  const { comments, articleID } = props;
  const { id, name, avatar, type: userType } = useSelector(
    (state: ApplicationState) => state.user.data.data,
  );
  const { logged } = useSelector((state: ApplicationState) => state.user);
  const limit = 2;
  const [newComment, setNewComment] = useState({});
  const [report, setReport] = useState({});

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

  const [open, setOpen] = React.useState(false);

  const handleOpen = reportData => {
    const data = { ...reportData, informer: { name, id } };
    setReport(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleReportFormikSubmit(values) {
    const data = { ...report, info: values.report };
    dispatch(ComplaintsActionList.complaintRequest(data));
    handleClose();
  }

  function handleLoadMore(idComment: string) {
    if (loadMore.indexOf(idComment) <= -1) {
      dispatchLoadMore({ type: 'add', value: idComment });
    }
  }

  function handleCommentFormikSubmit(values, { resetForm }) {
    resetForm({});
    comments.unshift({ text: values.comment, author: { id, name, image: avatar } });
    const data = { comments, articleID };
    dispatch(ActionsList.articleCommentRequest(data));
  }

  function handleDeleteComment(idComment) {
    const commentFiltered = comments.filter(comment => {
      return comment.id !== idComment;
    });
    const data = { comments: commentFiltered, articleID };
    dispatch(ActionsList.articleCommentRequest(data));
  }

  function handleAnsware(idComment: string) {
    if (answareForm.indexOf(idComment) <= -1) {
      dispatchAnswareForm({ type: 'add', value: idComment });
    }
  }

  function handleAnswareFormikSubmit(values, idComment) {
    comments.map(comment => {
      if (comment.id === idComment) {
        const temp = comment.answares || [];
        setNewComment({
          text: values.answare,
          author: { id, name, image: avatar },
          idComment,
          commentedAt: Date.now(),
        });
        temp.push({ text: values.answare, author: { id, name, image: avatar } });
        return { ...comment, answares: temp };
      }
      return comment;
    });
    const data = { comments, articleID };
    dispatch(ActionsList.articleCommentRequest(data));
  }

  function handleDeleteAnsware(idComment, idAnwsare) {
    const commentData = comments.map(comment => {
      if (comment.id === idComment) {
        const temp = comment.answares.filter(answare => answare.id !== idAnwsare);
        return { ...comment, answares: temp };
      }
      return comment;
    });
    const data = { comments: commentData, articleID };
    dispatch(ActionsList.articleCommentRequest(data));
  }

  return (
    <Content id="comments">
      <SpringModalComponent
        handleClose={handleClose}
        open={open}
        title="Reportar"
        text="Nós iremos analisar todo tipo de denuncia no site, por isso nos informe com detalhes o que aconteceu"
      >
        <Formik
          initialValues={{ report: '' }}
          validationSchema={Yup.object().shape({
            report: Yup.string().required('Por favor, digite o texto que quer comentar'),
          })}
          onSubmit={handleReportFormikSubmit}
        >
          {({ values, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid container item sm={9}>
                  <FieldContainer>
                    <Text
                      value={values.report}
                      name="report"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Digite o motivo do reporte :"
                      placeholder="Digite o motivo do reporte aqui ..."
                    />
                  </FieldContainer>
                </Grid>
                <Grid container item sm={3}>
                  <ButtonContainer>
                    <Send> Enviar </Send>
                  </ButtonContainer>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </SpringModalComponent>
      <Card>
        <CardContent>
          {logged ? (
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
          ) : (
            <div> Faça o seu Login ou Crie uma conta para comentar </div>
          )}
          <CommentSection>
            {comments &&
              comments.map(comment => (
                <div key={comment.id}>
                  <Divider />
                  <CommentContainer>
                    <CommentFieldComponent
                      text={comment.text}
                      author={{ name: comment.author.name, id: comment.author.id }}
                      commentedAt={FromNow(comment.commentedAt)}
                      handleAnsware={() => handleAnsware(comment.id)}
                      image={comment.author.image}
                      userType={userType}
                      logged={logged}
                      handleDeleteComment={handleDeleteComment}
                      idComment={comment.id}
                      handleOpen={handleOpen}
                    />
                    <AnswaresComponent
                      answares={comment.answares}
                      commentID={comment.id}
                      limit={limit}
                      loadMore={loadMore}
                      handleAnswareFormikSubmit={handleAnswareFormikSubmit}
                      handleLoadMore={handleLoadMore}
                      answareForm={answareForm}
                      userType={userType}
                      tempComment={newComment}
                      handleDeleteAnsware={handleDeleteAnsware}
                      handleOpen={handleOpen}
                      logged={logged}
                    />
                  </CommentContainer>
                </div>
              ))}
          </CommentSection>
        </CardContent>
      </Card>
    </Content>
  );
};

export default CommentsComponent;
