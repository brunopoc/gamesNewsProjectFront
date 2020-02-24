import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Box, Card, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { styled } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Header from '../../src/components/organisms/Header/HeaderComponent';
import { ActionsList } from '../../src/store/ducks/user';
import { ApplicationState } from '../../src/store';
import Email from '../../src/components/atoms/Inputs/Email';
import Password from '../../src/components/atoms/Inputs/Password';
import Send from '../../src/components/atoms/Buttons/Send';

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

const Reset = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const error = useSelector((state: ApplicationState) => state.user.resetPasswordError);
  const success = useSelector((state: ApplicationState) => state.user.resetPasswordSuccess);
  const signinValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Por favor, coloque um email')
      .required('Por favor, coloque um email'),
    password: Yup.string().required('Password é obrigatório'),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Os passwords precisam ser iguais!',
    ),
  });

  function handleFormikSubmit(values) {
    dispatch(
      ActionsList.resetPasswordRequest({
        email: values.email,
        password: values.password,
        token: router.query.token.toString(),
      }),
    );
  }

  if (success) {
    router.push('/login');
  }

  return (
    <div>
      <Header />
      <Container fixed>
        <BoxContainerStyled component="div">
          <Card>
            <BoxHeaderStyled component="div">Esqueci minha senha</BoxHeaderStyled>
            <BoxStyled>
              <Alert severity="info">Informe seu email e sua nova senha! =)</Alert>
              {error && (
                <Alert severity="error">
                  Houve um problema ao resetar a sua senha! Tente novamente mais tarde =/
                </Alert>
              )}
              <Formik
                initialValues={{ email: '', password: '', passwordRepet: '' }}
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
                      <Grid container item sm={12}>
                        <FormContainer>
                          <FieldContainer>
                            <Password
                              value={values.password}
                              name="password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              label="Digite sua senha :"
                              placeholder="Digite sua senha ..."
                            />
                            <ErrorSection>
                              {errors.password && touched.password && errors.password}
                            </ErrorSection>
                          </FieldContainer>
                        </FormContainer>
                      </Grid>
                      <Grid container item sm={12}>
                        <FormContainer>
                          <FieldContainer>
                            <Password
                              value={values.passwordConfirmation}
                              name="passwordConfirmation"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              label="Repita sua senha :"
                              placeholder="Repita sua senha ..."
                            />
                            <ErrorSection>
                              {errors.passwordConfirmation &&
                                touched.passwordConfirmation &&
                                errors.passwordConfirmation}
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

export default Reset;
