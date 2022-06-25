import React, { useState } from "react";
import SignForm from "../SignForm/SignForm";
import { Link } from "react-router-dom";

function Register(props) {
  const [userRegisterData, setUserRegisterData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = userRegisterData;
    props.handleRegister({ email, password });
  };

  return (
    <SignForm
      title="Регистрация"
      textButton="Зарегистрироваться"
      onSubmit={handleSubmit}
      setInputs={setUserRegisterData}
      inputsValue={userRegisterData}
    >
      <p className="sign-form__text">
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="sign-form__text">
          Войти
        </Link>
      </p>
    </SignForm>
  );
}

export default Register;
