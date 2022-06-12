import { Form, Formik } from "formik";
import * as Bootstrap from "react-bootstrap";
import InputField from "./InputField";
import * as Yup from "yup";
import Swal from "sweetalert2";
import LoginContext from "../context/LoginContext";
import { useContext } from "react";

interface RegisterFormValues {
  email: string;
  password: string;
  confirmation: string;
}

const RegisterForm = () => {
  const { setValue } = useContext(LoginContext);

  const initialValues: RegisterFormValues = {
    email: "",
    password: "",
    confirmation: "",
  };

  const signupMethod = async (formValues: RegisterFormValues) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SIGNUP_ENDPOINT}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (response.status === 201) {
        const data = await response.json();
        setValue(data?.results.token);
      }

      Swal.fire({
        title: "Registration complete",
        icon: "success",
        text: "User created successfully",
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Error",
        text: "There was an error processing your request, try again later.",
        icon: "error",
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        signupMethod(values);
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .required("Field required.")
          .email("Enter a valid email."),
        password: Yup.string()
          .required("Field required.")
          .min(8, "Password must be 8 characters or more."),
        confirmation: Yup.string().oneOf(
          [Yup.ref("password"), null],
          "Passwords doesn't match. Please, try again."
        ),
      })}
    >
      <Bootstrap.Form as={Form}>
        <InputField name="email" label="Email" type="email"></InputField>
        <InputField
          name="password"
          label="Password"
          type="password"
        ></InputField>

        <InputField
          name="confirmation"
          label="Password confirmation"
          type="password"
        ></InputField>
        <Bootstrap.Button className="globalButton px-5 " type="submit">
          Register
        </Bootstrap.Button>
      </Bootstrap.Form>
    </Formik>
  );
};

export default RegisterForm;
