import React from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';
import api from '../../../utils/api';

type OwnProps = {
  onBlur?: (...args: any[]) => void;
  setFieldValue: (...args: any[]) => void;
  value?: string;
  name: string;
};

const RichTextComponent = (props: OwnProps) => {
  return (
    <CKEditor
      name="content"
      editor={ClassicEditor}
      data={props?.value}
      onChange={(_event, editor) => {
        const data = editor.getData();
        props.setFieldValue('content', data);
      }}
      onBlur={(_event, editor) => {
        const data = editor.getData();
        const e = { target: { value: data, name: props.name } };
        // eslint-disable-next-line no-unused-expressions
        props?.onBlur(e);
      }}
      config={{
        ckfinder: {
          uploadUrl: `${api.publicRuntimeConfig.API_ENDPOINT}/posts/uploadImage/`,
        },
      }}
    />
  );
};

export default RichTextComponent;
