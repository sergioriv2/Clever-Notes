import React from "react";
interface LoginContextValues {
  storedValue: string | any;
  setValue: string | any;
}

const LoginContext = React.createContext<LoginContextValues>({
  storedValue: "",
  setValue: () => {},
});

export default LoginContext;
