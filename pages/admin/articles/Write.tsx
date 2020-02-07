import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Container, Box, Grid, styled } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import dynamic from 'next/dynamic';
import { AppBarComponent } from '../../../src/components/organisms';
import Text from '../../../src/components/atoms/Inputs/Text';
import Send from '../../../src/components/atoms/Buttons/Send';
import { ActionsList } from '../../../src/store/ducks/articles';

const CKEditor = dynamic(
  () => import('../../../src/components/molecules/RichText/RichTextComponent'),
  {
    ssr: false,
  },
);

const FieldContainer = styled(Box)({
  height: '80px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  flexDirection: 'column',
});

const FormContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
});

const ErrorSection = styled(Box)({
  height: '20px',
  textAlign: 'right',
  width: '100%',
});

const BoxStyled = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '40px',
});

const FooterForm = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '20px',
});

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Por favor, coloque um titulo'),
  content: Yup.string().required('Por favor, escreva sua postagem'),
});

const Write = () => {
  const dispatch = useDispatch();
  function handleFormikSubmit(values) {
    dispatch(ActionsList.articleRequest(values));
  }

  return (
    <AppBarComponent>
      <Container fixed>
        <Typography paragraph>
          Aqui voce pode escrever artigos, e apos uma analise, nos publicamos o seu artigo no site!
        </Typography>
        <BoxStyled component="div">
          <Formik
            initialValues={{ title: '', content: '' }}
            validationSchema={validationSchema}
            onSubmit={handleFormikSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                  <Grid container item sm={12}>
                    <FormContainer>
                      <FieldContainer>
                        <Text
                          value={values.title}
                          name="title"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          label="Digite um titulo :"
                          placeholder="Digite um titulo ..."
                        />
                        <ErrorSection>{errors.title && touched.title && errors.title}</ErrorSection>
                      </FieldContainer>
                    </FormContainer>
                  </Grid>
                  <Grid container item md={12}>
                    <FormContainer>
                      <CKEditor
                        name="content"
                        value={values.content}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <ErrorSection>
                        {errors.content && touched.content && errors.content}
                      </ErrorSection>
                    </FormContainer>
                  </Grid>
                </Grid>
                <FooterForm>
                  <Send> Enviar </Send>
                </FooterForm>
              </form>
            )}
          </Formik>
        </BoxStyled>
      </Container>
    </AppBarComponent>
  );
};

export default Write;
