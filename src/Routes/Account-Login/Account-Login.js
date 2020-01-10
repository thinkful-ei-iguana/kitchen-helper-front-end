import React from "react";
import { Link } from "react-router-dom";
<<<<<<< Updated upstream:src/Components/Account-Login.js
import AuthHelper from "../Helpers/Auth";
import Context from "../Components/Context";
import "../Styles/Login.css";
import "../Styles/Home.css";
=======
import AuthHelper from "../../Helpers/Auth";
import Context from "../../Components/Context/Context";
// import "./src/Styles/Login.css";
// import "./src/Styles/Home.css";
>>>>>>> Stashed changes:src/Routes/Account-Login/Account-Login.js

export default class Login extends React.Component {
  static contextType = Context;
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  state = { error: null };

  onLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/Home";
    history.push(destination);
  };

  loginSubmit = e => {
    e.preventDefault();
    this.setState({ error: null });
    const { user_name, password } = e.target;
    AuthHelper.login({
      user_name: user_name.value.toLowerCase(),
      password: password.value
    })
      .then(res => {
        user_name.value = "";
        password.value = "";
        this.context.saveAuthToken(res.authToken);
        this.context.onLogin();
        this.props.history.push("/");
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    return (
      <div className="Login">
        <header className="Login-Header"></header>
        <form
          className="Login-Form"
          onSubmit={this.loginSubmit}
          onMouseOver={this.submitButtonHasBeenHovered}
        >
          <label className="field a-field a-field_a2">
            <input
              className="field__input a-field__input"
              required
              name="user_name"
              placeholder="Username"
              onChange={this.userNameChanged}
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label">Username</span>
            </span>
          </label>
          <label className="field a-field a-field_a2">
            <input
              className="field__input a-field__input"
              required
              name="password"
              type="password"
              placeholder="Password"
              onChange={this.passwordHasChanged}
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label">Password</span>
            </span>
          </label>
          <div className="btn-row">
            <input
              type="submit"
              className="submitLogin"
              value="login"
              onClick={this.submitButtonHasBeenClicked}
            />
            <Link to="/Create-Account">
              <button className="newAccount">Create an account</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
