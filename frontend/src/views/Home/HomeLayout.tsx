import React, { useContext } from "react";

import Header from "../../components/Home/Header";
import { Outlet } from "react-router-dom";
import LoginContext from "../../components/context/LoginContext";

const HomeLayout = () => {
  const { storedValue } = useContext(LoginContext);

  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
    </>
  );
};

export default HomeLayout;
