import React from 'react';
import { Container, Box, Card, Grid } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/organisms/Header/HeaderComponent';
import Email from '../../components/atoms/Inputs/Email';
import Send from '../../components/atoms/Buttons/Send';
import { ActionsList } from '../../store/ducks/user';
import { ActionsList as CategoriesActionList } from '../../store/ducks/categories';
import { ApplicationState } from '../../store';
import { HeadComponent } from '../../components/organisms';

const BoxContainerStyled = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  paddingTop: '40px',
});

const BoxStyled = styled(Box)({
  padding: '20px',
});

const BoxHeaderStyled = styled(Box)({
  width: '100%',
  padding: '20px',
  textAlign: 'center',
  backgroundColor: '#000',
  color: '#fff',
  fontWeight: 800,
  fontSize: '18px',
});

const FooterForm = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '20px',
});

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

const Forgot = () => {
  const dispatch = useDispatch();
  const error = useSelector((state: ApplicationState) => state.user.forgetPasswordError);
  const success = useSelector((state: ApplicationState) => state.user.forgetPasswordSuccess);
  const signinValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Por favor, coloque um email')
      .required('Por favor, coloque um email'),
  });

  function handleFormikSubmit(values) {
    dispatch(ActionsList.forgotPasswordRequest(values.email));
  }

  return (
    <div>
      <HeadComponent
        title="Esqueci a minha senha - Sou Gamer Com Orgulho"
        description="Procurando noticias sobre o mundo dos games? Então veio ao lugar certo! Sou Gamer Com Orgulho é um portal onde os próprios leitores podem escrever a matéria. Venha fazer parte da nossa comunidade!"
        url="https://www.sougamercomorgulho.com.br"
        image="https://gameapi-upload.s3.amazonaws.com/137293.jpg"
      />
      <Header />
      <Container fixed>
        <BoxContainerStyled component="div">
          <Card>
            <BoxHeaderStyled component="div">Esqueci minha senha</BoxHeaderStyled>
            <BoxStyled>
              <Alert severity="info">
                Informe seu email, vamos mandar um link para que você possa mudar sua senha! =)
              </Alert>
              {error && (
                <Alert severity="error">
                  Houve um problema ao enviar seu email! Tente novamente mais tarde =/
                </Alert>
              )}
              {success && (
                <Alert severity="success">
                  Email enviado! Caso não encontre seu email na Caixa de Entrada, verifique seus
                  spams ;)
                </Alert>
              )}
              <Formik
                initialValues={{ email: '' }}
                validationSchema={signinValidationSchema}
                onSubmit={handleFormikSubmit}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                      <Grid container item sm={12}>
                        <FormContainer>
                          <FieldContainer>
                            <Email
                              value={values.email}
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              label="Digite seu email :"
                              placeholder="Digite seu email ..."
                            />
                            <ErrorSection>
                              {errors.email && touched.email && errors.email}
                            </ErrorSection>
                          </FieldContainer>
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
          </Card>
        </BoxContainerStyled>
      </Container>
    </div>
  );
};

Forgot.getInitialProps = async ({ store }) => {
  store.dispatch(CategoriesActionList.listCategoriesRequest());
};

export default Forgot;
