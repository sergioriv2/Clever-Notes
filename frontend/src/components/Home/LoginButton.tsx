import { useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import LoginForm from "../Form/LoginForm";

const LoginButton = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [registerForm, setRegisterForm] = useState(false);

  const handleClick = () => {
    setLoginModal(!loginModal);
  };

  return (
    <>
      <Button
        className="justify-self-end navLoginButton px-3"
        variant="danger"
        onClick={() => handleClick()}
      >
        Login
      </Button>
      <Modal show={loginModal} onHide={handleClick} centered size="lg">
        <Container>
          <Modal.Header closeButton>
            <Modal.Title>Login/Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="mb-4">
              Enter your email and password from your account
            </p>
            <LoginForm></LoginForm>
          </Modal.Body>
        </Container>
      </Modal>
    </>
  );
};

export default LoginButton;
