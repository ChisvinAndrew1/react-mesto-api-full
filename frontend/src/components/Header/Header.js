import logo from "../../images/logo.svg";
import { Route, Link } from "react-router-dom";

function Header({ email, onLogOut }) {
  return (
    <header className="header page__header">
      <img className="header__logo" src={logo} alt="логотип Mesto" />
      <div className="header__container">
        <Route path="/sign-up">
          <Link className="auth__link" to="/sign-in">
            Войти
          </Link>
        </Route>
        <Route path="/sign-in">
          <Link to="/sign-up" className="auth__link">
            Регистрация
          </Link>
        </Route>
        <Route exact path="/">
          <p className="auth__email">{email}</p>
          <Link to="/sign-in" className="auth__link" onClick={onLogOut}>
            Выйти
          </Link>
        </Route>
      </div>
    </header>
  );
}

export default Header;
