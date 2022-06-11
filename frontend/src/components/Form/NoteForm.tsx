import React, { MutableRefObject, useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import * as Bootstrap from "react-bootstrap";
import InputField from "./InputField";
import RichInputField from "./RichInputField";
import AppContext from "../context/AppContext";
import Swal from "sweetalert2";

interface FormValues {
  id?: number;
  title: string;
  content: string;
}

interface NoteFormProps {
  values: FormValues | undefined;
  edit?: boolean;
}

const NoteForm = ({ values, edit }: NoteFormProps) => {
  const { refetchNotes, setModal } = useContext(AppContext);

  const initialValues: FormValues = {
    title: values?.title || "",
    content: values?.content || "",
  };

  const createMethod = async (formValues: FormValues) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_NOTES_ENDPOINT}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();

      Swal.fire({
        title: "Created",
        text: data.results.msg,
        icon: "success",
      });

      refetchNotes();
    } catch (err) {
      console.log(err);

      Swal.fire({
        title: "Error",
        text: "There was an error processing your request, try again later.",
        icon: "error",
      });
    } finally {
      setModal(false);
    }
  };

  const updateMethod = async (formValues: FormValues) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_NOTES_ENDPOINT}${values?.id}`,
        {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          },
          body: JSON.stringify(formValues),
        }
      );

      const data = await response.json();

      Swal.fire({
        title: "Edited",
        text: data.results.msg,
        icon: "success",
      });

      refetchNotes();
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error",
        text: "There was an error processing your request, try again later.",
        icon: "error",
      });
    } finally {
      setModal(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        edit ? updateMethod(values) : createMethod(values);
      }}
      validationSchema={Yup.object({
        title: Yup.string().required("Field required."),
        content: Yup.string().required("Field required."),
      })}
    >
      <Bootstrap.Form as={Form}>
        <InputField name="title" label="Title"></InputField>
        <RichInputField name="content" label="Content"></RichInputField>
        <Bootstrap.Row className="d-flex justify-content-end my-3">
          <Bootstrap.Col>
            <Bootstrap.Button type="button" variant="outline-primary">
              Cancel
            </Bootstrap.Button>
          </Bootstrap.Col>
          <Bootstrap.Col>
            <Bootstrap.Button type="submit">Save</Bootstrap.Button>
          </Bootstrap.Col>
        </Bootstrap.Row>
      </Bootstrap.Form>
    </Formik>
  );
};

export default NoteForm;
