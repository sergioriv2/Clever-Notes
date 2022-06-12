import { Form, Formik } from "formik";
import * as Bootstrap from "react-bootstrap";
import InputField from "./InputField";
import * as Yup from "yup";
import Swal from "sweetalert2";
import LoginContext from "../context/LoginContext";
import { useContext } from "react";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const { setValue } = useContext(LoginContext);

  const loginMethod = async (formValues: LoginFormValues) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_LOGIN_ENDPOINT}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (response.status !== 500) {
        const data = await response.json();
        setValue(data?.results.token);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        loginMethod(values);
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .required("Field required.")
          .email("Enter a valid email."),
        password: Yup.string().required("Field required"),
      })}
    >
      <Bootstrap.Form as={Form}>
        <InputField name="email" label="Email" type="email"></InputField>
        <InputField
          name="password"
          label="Password"
          type="password"
        ></InputField>

        <Bootstrap.Button
          variant="danger"
          className="globalButton px-4 py-2"
          type="submit"
        >
          Sign In
        </Bootstrap.Button>
      </Bootstrap.Form>
    </Formik>
  );
};

export default LoginForm;
