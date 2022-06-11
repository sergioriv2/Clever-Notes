import React from 'react';
import {FieldHookConfig, useField} from 'formik';
import {Form, Row, Col} from 'react-bootstrap';

interface InputFieldProps {
    label: string;
    type?: string,
}

const InputField = (
    {
        label,
        type = 'text',
        ...props
    }: InputFieldProps & FieldHookConfig<string>
    ) => {

    const [field, meta] = useField(props);  
    return(
        <Form.Group as={Row} className="mb-4">
            <Col xs={12} md={3}>
                <Form.Label>
                    {label}
                </Form.Label>
            </Col>
            <Col xs={12} md={9}>
                <Form.Control {...field} type={type}/>
            </Col>
            {meta.touched && meta.error ? (
            <Col><p>{meta.error}</p></Col>
            ) : null}
        </Form.Group>
    )
}

export default InputField;