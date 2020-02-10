import React, { useEffect } from 'react';
import { Box, Grid, styled } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import dynamic from 'next/dynamic';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import Text from '../../atoms/Inputs/Text';
import Send from '../../atoms/Buttons/Send';
import { ActionsList } from '../../../store/ducks/articles';
import { ApplicationState } from '../../../store';
import { ActionsList as CategorieActionList } from '../../../store/ducks/categories';

const CKEditor = dynamic(() => import('../RichText/RichTextComponent'), {
  ssr: false,
});

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
  height: '80px',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
});

const RichTextContainer = styled(Box)({
  width: '100%',
});

const TitleLabel = styled(Box)({
  width: '100%',
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

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Por favor, coloque um titulo'),
  content: Yup.string()
    .required('Por favor, escreva sua postagem')
    .min(250, 'O Seu artigo é muito pequeno'),
  upload: Yup.mixed().required('Por favor, faça o upload de uma imagem de destaque'),
  categories: Yup.array().required('Por favor, informe a categoria'),
  tags: Yup.array(),
});

const WriteFormComponent = () => {
  const dispatch = useDispatch();
  const author = useSelector((state: ApplicationState) => state.user.data.data?.name) || '';
  const categoriesOptions = useSelector((state: ApplicationState) => state.categories.list) || [];
  function handleFormikSubmit(values, { resetForm }) {
    resetForm({});
    const data = { ...values, author };
    dispatch(ActionsList.articleRequest(data));
  }
  useEffect(() => {
    dispatch(CategorieActionList.listCategoriesRequest());
  }, []);

  return (
    <Formik
      initialValues={{ title: '', content: '', upload: null, categories: [], tags: [] }}
      validationSchema={validationSchema}
      onSubmit={handleFormikSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
      }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid container item sm={12}>
              <FormContainer>
                <FieldContainer>
                  <FieldLineContainer>
                    <Text
                      value={values.title}
                      name="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Digite um titulo :"
                      placeholder="Digite um titulo ..."
                    />
                    <ErrorSection>{errors.title && touched.title && errors.title}</ErrorSection>
                  </FieldLineContainer>
                </FieldContainer>
              </FormContainer>
            </Grid>
            <Grid container item md={12}>
              <FormContainer>
                <FieldContainer>
                  <RichTextContainer>
                    <CKEditor
                      name="content"
                      value={values.content}
                      onBlur={handleBlur}
                      setFieldValue={setFieldValue}
                    />
                  </RichTextContainer>
                  <ErrorSection>{errors.content && touched.content && errors.content}</ErrorSection>
                </FieldContainer>
              </FormContainer>
            </Grid>
            <Grid container item md={6}>
              <FormContainer>
                <FieldContainer>
                  <TitleLabel>Categoria:</TitleLabel>
                  <FieldLineContainer>
                    <Select
                      name="categories"
                      id="categories"
                      onBlur={() => setFieldTouched('categories', true)}
                      value={values.categories}
                      onChange={opt => {
                        setFieldValue('categories', opt);
                      }}
                      options={categoriesOptions}
                      error={errors.categories}
                      touched={touched.categories}
                      isMulti
                    />
                  </FieldLineContainer>
                  <ErrorSection>
                    {errors.categories && touched.categories && errors.categories}
                  </ErrorSection>
                </FieldContainer>
              </FormContainer>
            </Grid>
            <Grid container item md={6}>
              <FormContainer>
                <FieldContainer>
                  <TitleLabel>Tags:</TitleLabel>
                  <FieldLineContainer>
                    <CreatableSelect
                      name="tags"
                      id="tags"
                      onBlur={() => setFieldTouched('tags', true)}
                      value={values.tags}
                      onChange={opt => {
                        setFieldValue('tags', opt);
                      }}
                      options={[]}
                      error={errors.tags}
                      touched={touched.tags}
                      isMulti
                    />
                  </FieldLineContainer>
                  <ErrorSection>{errors.tags && touched.tags && errors.tags}</ErrorSection>
                </FieldContainer>
              </FormContainer>
            </Grid>
            <Grid container item sm={12}>
              <FormContainer>
                <FieldContainer>
                  <TitleLabel>Adicione uma imagem de destaque:</TitleLabel>
                  <FieldLineFileContainer>
                    <input
                      id="upload"
                      type="file"
                      name="upload"
                      onChange={e => {
                        setFieldValue('upload', e.currentTarget.files[0]);
                      }}
                    />
                  </FieldLineFileContainer>
                  <ErrorSection>{errors.upload && touched.upload && errors.upload}</ErrorSection>
                </FieldContainer>
              </FormContainer>
            </Grid>
          </Grid>
          <FooterForm>
            <Send> Enviar </Send>
          </FooterForm>
          <style jsx global>
            {`
              .ck-editor__editable {
                height: 300px !important;
                width: 100%;
              }
              form {
                width: 100%;
              }
            `}
          </style>
        </form>
      )}
    </Formik>
  );
};

export default WriteFormComponent;
