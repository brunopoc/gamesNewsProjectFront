import React from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { Grid, Box, styled } from '@material-ui/core';
import * as Yup from 'yup';
import { Answare } from '../../../store/ducks/articles';
import Text from '../../atoms/Inputs/Text';
import Send from '../../atoms/Buttons/Send';
import { FromNow } from '../../../utils/moment';
import { AnswareFieldComponent } from '../../molecules';
import { ActionsList } from '../../../store/ducks/user';

const AnswareSection = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  marginLeft: '20px',
  padding: '5px',
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

const LoadMoreStyled = styled(Box)({
  color: '#b2b2b2',
  fontWeight: 600,
  width: '100%',
  textAlign: 'center',
  cursor: 'pointer',
});

type OwnProps = {
  answares: Answare[];
  commentID: string;
  limit: number;
  loadMore: any[];
  answareForm: any[];
  userType: string;
  tempComment: any;
  logged: boolean;
  handleAnswareFormikSubmit: (...args: any[]) => void;
  handleLoadMore: (...args: any[]) => void;
  handleDeleteAnsware: (...args: any[]) => void;
  handleOpen: (...args: any[]) => void;
};

const AnswaresComponent = ({
  answares,
  commentID,
  limit,
  loadMore,
  handleAnswareFormikSubmit,
  handleLoadMore,
  answareForm,
  userType,
  tempComment,
  handleDeleteAnsware,
  handleOpen,
  logged,
}: OwnProps) => {
  const dispatch = useDispatch();
  const handleBlock = (id: string, blocked: boolean) => {
    dispatch(ActionsList.blockRequest(id, blocked));
  };

  return (
    <AnswareSection>
      {answares &&
        answares.map((answare, index) => {
          const loadAll = loadMore.indexOf(commentID) >= 0;
          if (limit >= index || loadAll) {
            return (
              <div key={answare.id}>
                {(limit > index || loadAll) && (
                  <AnswareFieldComponent
                    text={answare.text}
                    author={answare.author}
                    commentedAt={FromNow(answare.commentedAt)}
                    image={answare.author.image}
                    handleBlock={handleBlock}
                    userType={userType}
                    handleDeleteAnsware={handleDeleteAnsware}
                    commentID={commentID}
                    answareID={answare.id}
                    handleOpen={handleOpen}
                    logged={logged}
                  />
                )}
                {limit === index && !loadAll && (
                  <LoadMoreStyled onClick={() => handleLoadMore(commentID)}>
                    ... Carregar Mais ...
                  </LoadMoreStyled>
                )}
                {limit === index && !loadAll && tempComment.idComment === commentID && (
                  <AnswareFieldComponent
                    text={tempComment.text}
                    author={tempComment.author}
                    commentedAt={FromNow(tempComment.commentedAt)}
                    image={tempComment.author.image}
                    key="temp"
                    handleBlock={handleBlock}
                    userType={userType}
                    handleDeleteAnsware={handleDeleteAnsware}
                    commentID={commentID}
                    answareID={answare.id}
                    handleOpen={handleOpen}
                    logged={logged}
                  />
                )}
              </div>
            );
          }
          return <div key={answare.id} />;
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
};

export default AnswaresComponent;
