import React from "react";
import { Link } from "react-router-dom";
import Context from "../Components/Context";

export default class DesktopMenu extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };
  }
  render() {
    const viewRecipe = event => {
      event.preventDefault();
      return this.props.routeProps.history.push(
        `/search/${this.state.searchText}`
      );
    };

    return (
      <div className="desktopMenu">
        {this.context.isLoggedIn ? (
          <div className="Header__logged-in">
            <div class="dropdown">
              <button class="dropbtn">
                {this.context.currentUser.user_name}
                <i class="fa fa-caret-down"></i>
              </button>
              <div class="dropdown-content">
                <Link to={`/user/${this.context.currentUser.user_name}`}>
                  My Account
                </Link>
                <Link to="/Create-Recipe">Create Recipe</Link>
                <Link onClick={this.context.onLogout} to="/Home">
                  Logout
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="Header__logged-out">
            <Link to="/login">Log in</Link>
            <Link to="/create-account">Register</Link>
          </div>
        )}
        <form className="Desktop-Menu-UserSearchForm">
          <label className="field a-field a-field_a2">
            <input
              onInput={e => {
                this.setState({ searchText: e.target.value });
              }}
              className="field__input a-field__input"
              placeholder="Search"
              required
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label"></span>
            </span>
          </label>
          <button type="submit" onClick={viewRecipe}>
            Search
          </button>
        </form>
      </div>
    );
  }
}
