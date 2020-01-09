import React from "react";
import { Link } from "react-router-dom";
import Context from "../Components/Context";
import "../Styles/Buttons.css";

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
      <div
        className={`mobileMenu ${
          this.props.state.open ? "is-open" : "is-closed"
        }`}
      >
        <nav className={this.props.state.open}>
          <button className="Close-Menu" onClick={this.props.mobileToggle}>
            <i className="fas fa-times"></i>
          </button>
          <div id="Inner-Container">
            <div id="Account-Options">
              {this.currentUser.hasAuthToken()
                ? this.props.renderLogoutLink()
                : this.props.renderLoginLink()}
            </div>
            <form id="Mobile-Menu-UserSearchForm">
              <label className="field a-field a-field_a2">
                <input
                  className="field__input a-field__input"
                  placeholder="Apple IPhone 11"
                  required
                />
                <span className="a-field__label-wrap">
                  <span className="a-field__label">Search</span>
                </span>
              </label>
              <button type="submit">search</button>
            </form>
            <div id="DarkMode"></div>
          </div>
        </nav>
      </div>
    );
  }
}
