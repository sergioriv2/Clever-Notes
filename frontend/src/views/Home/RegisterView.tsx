import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import RegisterForm from "../../components/Form/RegisterForm";
import { Navigate } from "react-router-dom";
import LoginContext from "../../components/context/LoginContext";

const RegisterView = () => {
  const { storedValue } = useContext(LoginContext);
  if (storedValue) return <Navigate to="/"></Navigate>;

  return (
    <Container className="my-5">
      <Row>
        <Col className="my-3">
          <h2>Welcome to Clever Notes!</h2>
          <p>Create your account and enjoy writing notes.</p>
          <p>Already have an account? Click on the login button </p>
        </Col>
      </Row>
      <Row>
        <Col className="my-3">
          <h2>REGISTER FORM</h2>
          <RegisterForm></RegisterForm>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterView;
