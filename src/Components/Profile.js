import React from "react";
import AuthHelper from "../Helpers/Auth";
import RecipeHelper from "../Helpers/Recipe";
import { Link } from "react-router-dom";
import Recipe from "../Components/Recipe";
import Context from "../Components/Context";

export default class DetailedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: {},
      userName: "",
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

  componentDidMount() {
    console.log("component mounted");
    AuthHelper.getPublicAccountData(this.props.match.params.user_name).then(
      data =>
        this.setState({
          profileData: data,
          first_name: data.first_name.split(" ")[0]
        }) +
        RecipeHelper.getAllMyRecipes(data.id).then(recipeData => {
          this.setState({ myRecipes: recipeData });
        })
    );
  }

  editAccount = () => {
    console.log("not setup yet");
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

  renderRecipe = () => {
    return this.state.myRecipes.map(recipe => {
      return (
        <div className="food">
          <Recipe key={recipe.title} {...recipe} />;
        </div>
      );
    });
  };

  renderNoRecipes = () => {
    return (
      <h3 className="noRecipe">
        {this.state.first_name} has no recipes currently
      </h3>
    );
  };
  // if (this.state.myRecipes.length > 1) {
  //   this.state.myRecipes.map(recipe => {});
  // } else {
  //   return (
  //     <h3 className="noRecipe">
  //       {this.props.match.params.user_name} has no recipes currently
  //     </h3>
  //   );
  // }

  render() {
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
            <div className="container">I'm the recipes you've made!</div>
          </div>
          {this.accountOption()}
        </div>
        <div>
          {this.state.myRecipes.length > 0
            ? this.renderRecipe()
            : this.renderNoRecipes()}
        </div>
      </>
    );
  }
}
