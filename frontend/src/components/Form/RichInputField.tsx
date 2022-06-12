import React, { useState } from "react";
import { useField, useFormikContext } from "formik";
import { Form, Row, Col } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "./Form.css";

interface InputFieldProps {
  label: string;
  type?: string;
  name: string;
}

interface FormValues {
  title: string;
  content: string;
}

const RichInputField = ({ label, name }: InputFieldProps) => {
  const { setFieldValue, setFieldTouched, values } =
    useFormikContext<FormValues>();
  const [, meta] = useField(name);

  const [editorState, setEditorState] = useState(
    !values.content
      ? () => EditorState.createEmpty()
      : EditorState.createWithContent(
          convertFromRaw(JSON.parse(values.content))
        )
  );

  const updateTextDescription = async (state: any) => {
    setEditorState(state);

    const data = convertToRaw(editorState.getCurrentContent());
    setFieldValue(name, JSON.stringify(data));
  };

  return (
    <Form.Group as={Row} className="mb-4">
      <Col xs={12} md={3}>
        <Form.Label>{label}</Form.Label>
        {meta.touched && meta.error ? (
          <p className="errorLabel">{meta.error}</p>
        ) : null}
      </Col>
      <Col
        onBlur={() => setFieldTouched(name, true)}
        xs={12}
        md={9}
        className="richEditor"
      >
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={updateTextDescription}
        />
      </Col>
    </Form.Group>
  );
};

export default RichInputField;
