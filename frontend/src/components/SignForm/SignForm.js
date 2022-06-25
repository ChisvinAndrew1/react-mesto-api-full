import React from "react";
import "./SignForm.css";

function SignForm({
  inputsValue,
  setInputs,
  title,
  textButton,
  onSubmit,
  children,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form className="sign-form" name="email" onSubmit={onSubmit} noValidate>
      <h2 className="popup__heading" style={{ color: "white" }}>
        {title}
      </h2>
      <input
        className="popup__input"
        value={inputsValue.email || ""}
        onChange={handleChange}
        name="email"
        type="email"
        placeholder="Email"
        autoComplete="off"
        required
      />
      <span id="sign-error" className="error"></span>
      <input
        className="popup__input"
        value={inputsValue.password || ""}
        onChange={handleChange}
        name="password"
        type="password"
        placeholder="Password"
        autoComplete="off"
        required
      />
      <span id="sign-error" className="error"></span>
      <button type="submit" className="popup__sumbit sign-form__submit">
        {textButton}
      </button>
      {children}
    </form>
  );
}
export default SignForm;
