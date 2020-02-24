import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Grid, styled, Box } from '@material-ui/core';
import Password from '../../atoms/Inputs/Password';
import Email from '../../atoms/Inputs/Email';
import Send from '../../atoms/Buttons/Send';
import { ActionsList } from '../../../store/ducks/user';
import { onlyNotAuth } from '../../../utils/auth';

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
  color: '#C66262',
  fontWeight: 600,
});

const LoginFormComponent = () => {
  onlyNotAuth();
  const dispatch = useDispatch();
  const signinValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Por favor, coloque um email')
      .required('Por favor, coloque um email'),
    password: Yup.string().required('Por favor, coloque uma senha'),
  });

  function handleFormikSubmit(values) {
    dispatch(ActionsList.loginRequest(values));
  }

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
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
                  <ErrorSection>{errors.email && touched.email && errors.email}</ErrorSection>
                </FieldContainer>
              </FormContainer>
            </Grid>
            <Grid container item md={12}>
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
          </Grid>
          <FooterForm>
            <Send> Logar </Send>
          </FooterForm>
        </form>
      )}
    </Formik>
  );
};

export default LoginFormComponent;
