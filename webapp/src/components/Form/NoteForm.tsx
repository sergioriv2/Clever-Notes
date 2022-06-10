import React from 'react';
import {Formik, Form} from 'formik'
import * as Bootstrap from 'react-bootstrap'
import InputField from './InputField';
import RichInputField from './RichInputField';

interface FormValues{
    title: string,
    content: string
}

const NoteForm = () => {

    const initialValues: FormValues = { title: '', content: ''}

    return(
        <Formik initialValues={initialValues} onSubmit={(values)=>{console.log(values)}}>
            <Bootstrap.Form as={Form}>
                <InputField name='title' label='Title'></InputField>
                <RichInputField name='content' label='Content'></RichInputField>
                <Bootstrap.Row className="d-flex justify-content-end my-3">
                    <Bootstrap.Col>
                    <Bootstrap.Button type="button" variant="outline-primary">Cancel</Bootstrap.Button>
                    </Bootstrap.Col>
                    <Bootstrap.Col>
                        <Bootstrap.Button type="submit">Save</Bootstrap.Button>
                    </Bootstrap.Col>
                </Bootstrap.Row>
            </Bootstrap.Form>
        </Formik>
    )
}

export default NoteForm;