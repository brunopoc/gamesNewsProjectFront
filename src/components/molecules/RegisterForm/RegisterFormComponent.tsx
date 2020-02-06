import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Grid, styled, Box } from '@material-ui/core';
import Password from '../../atoms/Inputs/Password';
import Email from '../../atoms/Inputs/Email';
import Text from '../../atoms/Inputs/Text';
import Send from '../../atoms/Buttons/Send';
import { ActionsList } from '../../../store/ducks/register';
import { onlyNotAuth } from '../../../utils/auth';

const FooterForm = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '20px',
});

const FieldContainer = styled(Box)({
  height: '80px',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
});

const FormContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
});

const RegisterFormComponent = () => {
  onlyNotAuth();
  const dispatch = useDispatch();
  const signinValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Por favor, coloque um email')
      .required('Por favor, coloque um email'),
    name: Yup.string().required('Por favor, coloque um nome'),
    password: Yup.string().required('Por favor, coloque uma senha'),
  });

  function handleFormikSubmit(values) {
    dispatch(ActionsList.registerRequest(values));
  }

  return (
    <Formik
      initialValues={{ email: '', password: '', name: '' }}
      validationSchema={signinValidationSchema}
      onSubmit={handleFormikSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid container item md={6}>
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
                  {errors.email && touched.email && errors.email}
                </FieldContainer>
              </FormContainer>
            </Grid>
            <Grid container item md={6}>
              <FormContainer>
                <FieldContainer>
                  <Text
                    value={values.name}
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Digite seu Nome :"
                    placeholder="Digite seu Nome ..."
                  />
                  {errors.name && touched.name && errors.name}
                </FieldContainer>
              </FormContainer>
            </Grid>
            <Grid container item md={6}>
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
                  {errors.password && touched.password && errors.password}
                </FieldContainer>
              </FormContainer>
            </Grid>
          </Grid>
          <FooterForm>
            <Send> Criar uma Conta </Send>
          </FooterForm>
        </form>
      )}
    </Formik>
  );
};

export default RegisterFormComponent;
