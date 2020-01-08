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
    return (
      <div className="desktopMenu">
        {this.context.isLoggedIn ? (
          <div className="Header__logged-in">
            <div className="dropdown">
              <h4 className="dropbtn">
                {" "}
                Current user is: {this.context.currentUser.user_name}
                <i className="fa fa-caret-down"></i>
              </h4>
              <div className="dropdown-content">
                <Link to={`/user/${this.context.currentUser.user_name}`}>
                  My Account
                </Link>
                <p></p>
                <Link to="/Create-Recipe">Create Recipe</Link>
                <p></p>
                {/* <Link to="Edit-Recipe/3">Edit Recipe</Link> */}
                <p></p>
                <Link
                  className="logout-button"
                  onClick={this.context.onLogout}
                  to="/"
                >
                  Logout
                </Link>
                <p></p>
              </div>
            </div>
          </div>
        ) : (
          <div className="Header__logged-out">
            {/* onClick={refreshPage} */}
            <Link to="/login">Log in Test</Link>
            <p></p>
            <Link to="/create-account"> Register</Link>
            <p></p>
          </div>
        )}
      </div>
    );
  }
}
