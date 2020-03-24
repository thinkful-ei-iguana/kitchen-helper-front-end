import React from "react";
import { Link } from "react-router-dom";
import homePage from "../../src/Assets/Loggedinmainpage.png";
import LoggingIn from '../../src/Assets/loggingin.png';
import recipeDetail from "../../src/Assets/detailedviewofarecipe.png"


export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  render() {
    return (
      <div className="LandingPage">
        <header id="LandingPage-Header" className="flex-container">
          <div className="flex-item branding">
          </div>
          <div className="flex-item"></div>
        </header>
        <section id="landingPageDocumentation">
          <div className="site-description">
            <p className="p1">
              Kitchen Helper is a best friend in the kitchen. You have the ability to add
              your own recipes and update them as you need.
            </p>
            <p className="p2">
              Kitchen Helper will be a time and money saver, helping you create
              amazing meals at home while staying organized and never running
              out of that special ingredient you need for your amazing lasagna
              recipe.
            </p>

            <div className="login-signup">
              <div className="LoginBtn">
                <label className="login-label">Login: </label>
                <Link className="login-btn" to="/login">
                  Let's Get Cooking!
                </Link>
              </div>
              <div className="RegistrationBtn">
                <label className="registration-label">Sign Up:</label>
                <Link className="registration-btn" to="/create-account">
                  Come Join the Fun!
                </Link>
              </div>
            </div>
            <h4>Please test out our site using the username of 'guestuser' and the password of Password!2</h4>
            <div className="sampleImages">
              <img src={LoggingIn} className="landingSamples" alt="Logging Into Main Page" id="logging-in" />
              <img src={homePage} className="landingSamples" alt="Home Page" id="logged-in-main-page" />
              <img src={recipeDetail} className="landingSamples" alt="Recipe Detail" id="recipe-details" />
            </div>
          </div>
        </section>
        <section id="Landing-Buttons">
          <hr id="Connect-Divider" />
          <div id="buttons"></div>
        </section>
      </div>
    );
  }
}
