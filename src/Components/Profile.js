import React from "react";
import AuthHelper from "../Helpers/Auth";
import { Link } from "react-router-dom";
import Recipe from "../Components/Recipe";
import Context from "./Context";
import "../Styles/Buttons.css";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: {},
      firstName: "",
      myRecipes: []
    };
  }

  static contextType = Context;
  static defaultProps = {
    match: { params: {} }
  };

  truncate = text => {
    const words = text.split(" ");
    if (words.length > 2) {
      return words.slice(0, 2).join(" ") + " ...";
    }
    return text;
  };

  deleteAccount = () => {
    AuthHelper.deleteAccount(this.context.currentUser.user_name)
      .then(this.context.onLogout)
      .then(this.props.history.push("/"));
  };

  accountOption = () => {
    if (
      this.context.currentUser.user_name === this.props.match.params.user_name
    ) {
      return (
        <div className="accountButtons">
          <Link className="editAccount" to="/edit-account">
            Edit Account
          </Link>
          <button className="deleteAccount" onClick={this.deleteAccount}>
            Delete Account
          </button>
        </div>
      );
    }
  };

  renderRecipe = recipes => {
    return recipes.map(recipe => {
      return (
        <div key={recipe.id} className="food-item">
          <Recipe {...recipe} />;
        </div>
      );
    });
  };

  renderNoRecipes = () => {
    return (
      <>
        <div className="no-recipe-div">
          <h3 className="noRecipe">
            {this.context.currentUser.first_name} has no recipes currently
          </h3>
          <link to="/"></link>
          <Link type="submit" className="noRecipeGoHome" to={"/"}>
            Home
          </Link>
        </div>
      </>
    );
  };

  checkRecipeOwner = () => {
    return (
      <h3>
        {this.context.recipes.owner.filter(
          recipe => recipe.owner === this.context.currentUser.id
        )}
        ;
      </h3>
    );
  };

  render() {
    if (!this.context.isLoggedIn) {
      return <p>Nobody is logged in</p>;
    }
    const recipesOwned = this.context.recipes.filter(
      recipe => recipe.owner === this.context.currentUser.id
    );
    return (
      <>
        <div className="Profile">
          <div className="section">
            <div className="container">
              <span className="profile-date_created">
                Member Since: {this.context.currentUser.date_created}
              </span>
            </div>
            {this.accountOption()}
          </div>
          <div className="section">
            <h1>Your recipes:</h1>
          </div>
          {this.accountOption()}
        </div>
        <div>
          {recipesOwned.length > 0
            ? this.renderRecipe(recipesOwned)
            : this.renderNoRecipes()
          }
        </div>
        <div>
          <Link type="submit" className="noRecipeGoHome" to="/">
            Home
          </Link>
        </div>
      </>
    );
  }
}
