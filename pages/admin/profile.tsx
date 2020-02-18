import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, styled, Avatar, Container } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ApplicationState } from '../../src/store';
import Text from '../../src/components/atoms/Inputs/Text';
import Send from '../../src/components/atoms/Buttons/Send';
import { AppBarAdminComponent } from '../../src/components/organisms';
import { ActionsList } from '../../src/store/ducks/user';
import TitleComponent from '../../src/components/atoms/Title/TitleComponent';
import { withAuthSync } from '../../src/utils/auth';

const FieldContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  flexDirection: 'column',
});

const FieldLineContainer = styled(Box)({
  height: '80px',
  width: '100%',
});

const FieldLineFileContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const TitleLabel = styled(Box)({
  width: '100%',
  color: '#636363',
  fontWeight: 600,
  textTransform: 'uppercase',
  marginBottom: '10px',
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

const FooterForm = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '20px',
});

const ImageSection = styled(Avatar)({
  height: '200px',
  width: '200px',
  marginBottom: '10px',
});

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Por favor, coloque um titulo'),
});

const Profile = () => {
  withAuthSync(false);
  const dispatch = useDispatch();
  const { name, avatar, id } = useSelector((state: ApplicationState) => state.user.data.data);

  function handleFormikSubmit(values) {
    const data = { ...values, id };
    dispatch(ActionsList.updateProfileRequest(data));
  }
  return (
    <AppBarAdminComponent>
      <TitleComponent text="Meu Perfil" />
      <Container fixed>
        <Formik
          enableReinitialize
          initialValues={{ name, avatar, upload: null }}
          validationSchema={validationSchema}
          onSubmit={handleFormikSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid container item sm={12}>
                  <FormContainer>
                    <FieldContainer>
                      <TitleLabel>Adicione uma imagem de destaque:</TitleLabel>
                      <FieldLineFileContainer>
                        <ImageSection src={values.avatar} alt="Imagem de perfil" />
                        <input
                          id="upload"
                          type="file"
                          name="upload"
                          onChange={e => {
                            setFieldValue('avatar', URL.createObjectURL(e.currentTarget.files[0]));
                            setFieldValue('upload', e.currentTarget.files[0]);
                          }}
                        />
                      </FieldLineFileContainer>
                      <ErrorSection>
                        {errors.upload && touched.upload && errors.upload}
                      </ErrorSection>
                    </FieldContainer>
                  </FormContainer>
                </Grid>
                <Grid container item sm={12}>
                  <FormContainer>
                    <FieldContainer>
                      <FieldLineContainer>
                        <Text
                          value={values.name}
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          label="Digite o seu nome :"
                          placeholder="Digite o seu nome ..."
                        />
                        <ErrorSection>{errors.name && touched.name && errors.name}</ErrorSection>
                      </FieldLineContainer>
                    </FieldContainer>
                  </FormContainer>
                </Grid>
              </Grid>
              <FooterForm>
                <Send> Salvar </Send>
              </FooterForm>
            </form>
          )}
        </Formik>
      </Container>
    </AppBarAdminComponent>
  );
};

export default Profile;
