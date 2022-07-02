import { useContext } from "react";
import { Button } from "react-bootstrap";

import LoginContext from "../context/LoginContext";

const LogoutButton = () => {
  const { setValue } = useContext(LoginContext);

  const handleClick = () => {
    setValue("");
  };

  return (
    <Button
      className="justify-self-end navLoginButton px-3"
      variant="danger"
      onClick={() => handleClick()}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
