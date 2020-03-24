import React from "react";
import { Link } from "react-router-dom";
import DesktopMenu from "../Components/Desktop-Menu";
import Context from "./Context";
import "../Styles/Buttons.css"


export default class NavMenu extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  toggleMenu = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };

  render() {
    return (
      <header className="Nav-Header">
        <div className="LandingPageLinkDiv">
          <Link className="LandingPageLink" to="/">Landing Page Link</Link>
        </div>
        <DesktopMenu
          state={this.state}
          routeProps={this.props}
          renderLoginLink={this.renderLoginLink}
          renderLogoutLink={this.renderLogoutLink}
        />
      </header>
    );
  }
}
