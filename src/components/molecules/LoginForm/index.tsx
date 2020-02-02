import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import Password from '../../atoms/Inputs/Password';
import Email from '../../atoms/Inputs/Email';
import Send from '../../atoms/Buttons/Send';
import { ActionsList } from '../../../store/ducks/login';
import { onlyNotAuth } from '../../../utils/auth';

const LoginForm: React.FC = () => {
  onlyNotAuth();
  const dispatch = useDispatch();
  const signinValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Por favor, entre com um email valido')
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
          <Email
            value={values.email}
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            label="Digite seu email :"
            placeholder="Digite seu email ..."
          />
          {errors.email && touched.email && errors.email}
          <Password
            value={values.password}
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            label="Digite sua senha :"
            placeholder="Digite sua senha ..."
          />
          {errors.password && touched.password && errors.password}
          <Send> Logar </Send>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
