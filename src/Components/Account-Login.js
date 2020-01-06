import React from "react";
import { Link } from "react-router-dom";
import AuthHelper from "../Helpers/Auth";
import Context from "../Components/Context";

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
    console.log("success");
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/Home";
    history.push(destination);
    console.log(destination);
  };

  loginSubmit = e => {
    e.preventDefault();
    console.log("login submit has been called");
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
        // should be done in state
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
          onSubmit={e => {
            console.log("called");
            this.loginSubmit(e);
          }}
        >
          <label className="field a-field a-field_a2">
            <input
              className="field__input a-field__input"
              required
              name="user_name"
              placeholder="Username"
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
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label">Password</span>
            </span>
          </label>
          <div className="btn-row">
            <button type="submit" className="submitLogin">
              Login
            </button>
            <Link to="/Create-Account">
              <button className="newAccount">Create an account</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
