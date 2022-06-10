import React from 'react';
import { useField, useFormikContext } from 'formik';
import {Form, Row, Col} from 'react-bootstrap';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface InputFieldProps {
    label: string;
    type?: string;
    name: string,
}

interface FormValues{
    title: string,
    content: string
}

const RichInputField = (
    {
        label,
        name
    }: InputFieldProps
    ) => {

    const { setFieldValue, setFieldTouched, values } = useFormikContext<FormValues>();
    const [, meta] = useField(name);

    return(
        <Form.Group as={Row} className="my-3">
            <Col xs={12} md={3}>
                <Form.Label>
                {label}
                </Form.Label>
            </Col>
            <Col onBlur={()=> setFieldTouched(name, true)} xs={12} md={9}>
                <ReactQuill onChange={(value)=> setFieldValue(name, value)} value={values.content} />
            </Col>
            {meta.touched && meta.error ? (
            <Col><p>{meta.error}</p></Col>
            ) : null}
        </Form.Group>
    )
}

export default RichInputField;