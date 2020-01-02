import React from "react";
import { Route } from "react-router-dom";
import NavMenu from "../src/Components/Nav-Menu";
import Landing from "../src/Components/Landing";
import Home from "../src/Components/Home";
import AccountCreation from "../src/Components/Account-Creation";
import AccountLogin from "../src/Components/Account-Login";
import SearchResults from "../src/Components/Search-Results";
import AuthHelper from "../src/Helpers/Auth";
import Context from "../src/Components/Context";
import config from "./config";
import CreateRecipe from "../src/Components/Create-Recipe";
import Profile from "../src/Components/Profile";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      isLoggedIn: false,
      isLight: true,
      hasToken: this.hasAuthToken()
    };
  }

  componentDidMount() {
    if (this.hasAuthToken()) {
      AuthHelper.getCurrentUser(this.getAuthToken()).then(data =>
        this.setState(prevState => ({
          currentUser: data,
          isLoggedIn: true
        }))
      );
    }
  }

  saveAuthToken = token => {
    window.localStorage.setItem(config.TOKEN_KEY, token);
  };
  getAuthToken = () => {
    return window.localStorage.getItem(config.TOKEN_KEY);
  };
  hasAuthToken = () => {
    return !!this.getAuthToken();
  };
  makeBasicAuthToken = (userName, password) => {
    return window.btoa(`${userName}:${password}`);
  };

  onLogin = () => {
    AuthHelper.getCurrentUser(this.getAuthToken()).then(data =>
      this.setState(prevState => ({
        currentUser: data,
        isLoggedIn: true
      }))
    );
  };

  onLogout = () => {
    window.localStorage.removeItem(config.TOKEN_KEY);
    this.setState({ currentUser: {}, isLoggedIn: false });
  };

  toggleLightMode = () => {
    this.setState(prevState => ({
      isLight: !prevState.isLight
    }));
  };

  render() {
    console.log(this.state.currentUser);
    return (
      <Context.Provider
        value={{
          currentUser: this.state.currentUser,
          hasToken: this.state.hasToken,
          isLoggedIn: this.state.isLoggedIn,
          saveAuthToken: this.saveAuthToken,
          getAuthToken: this.getAuthToken,
          hasAuthToken: this.hasAuthToken,
          makeBasicAuthToken: this.makeBasicAuthToken,
          lightMode: this.toggleLightMode,
          onLogin: this.onLogin,
          onLogout: this.onLogout
        }}
      >
        {" "}
        <div className="App">
          <NavMenu />
          <Route
            exact
            path="/"
            render={routeProps => {
              return <Landing {...routeProps} />;
            }}
          />
          <Route
            exact
            path="/Home"
            render={routeProps => {
              return <Home {...routeProps} />;
            }}
          />
          <Route
            exact
            path="/Login"
            render={routeProps => {
              return <AccountLogin {...routeProps} />;
            }}
          />
          <Route
            exact
            path="/Create-Account"
            render={routeProps => {
              return <AccountCreation {...routeProps} />;
            }}
          />
          <Route
            exact
            path="/user/:username"
            render={routeProps => {
              return <Profile {...routeProps} />;
            }}
          />
          <Route
            exact
            path="/search/:searchterm"
            render={routeProps => {
              return <SearchResults {...routeProps} />;
            }}
          />
          <Route
            path="/Create-Recipe"
            render={routeProps => {
              return <CreateRecipe {...routeProps} />;
            }}
          />
          <Route
            path="/recipe/:recipeid"
            render={routeProps => {
              return;
            }}
          />
        </div>
      </Context.Provider>
    );
  }
}

export default App;
