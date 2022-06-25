import React, { useState } from "react";
import SignForm from "../SignForm/SignForm";

function Login(props) {
  const [userRegisterData, setUserRegisterData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userRegisterData.email || !userRegisterData.password) {
      return;
    }
    props.onSubmit(userRegisterData);
  };

  return (
    <SignForm
      title="Вход"
      textButton="Войти"
      onSubmit={handleSubmit}
      setInputs={setUserRegisterData}
      inputsValue={userRegisterData}
    />
  );
}

export default Login;
