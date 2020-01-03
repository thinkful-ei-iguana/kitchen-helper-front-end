import React from "react";
import AuthHelper from "../Helpers/Auth";
import RecipeHelper from "../Helpers/Recipe";
import Recipe from "../Components/Recipe";
import Context from "../Components/Context";

export default class DetailedView extends React.Component {
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

  componentDidMount() {
    AuthHelper.getPublicAccountData(this.props.match.params.username).then(
      data =>
        this.setState({
          profileData: data,
          firstName: data.name.split(" ")[0]
        })
    );
    RecipeHelper.getAllMyRecipes(this.props.match.params.user_name).then(data =>
      this.setState({ myRecipes: data })
    );
  }

  editAccount = () => {
    console.log("not setup yet");
  };

  deleteAccount = () => {
    AuthHelper.deleteAccount(this.context.currentUser.user_name)
      .then(this.context.onLogout)
      .then(this.props.history.push("/Home"));
  };

  accountOption = () => {
    if (
      this.context.currentUser.username === this.props.match.params.user_name
    ) {
      return (
        <div className="accountButtons">
          <button className="editAccount" onClick={this.editAccount}>
            Edit Account
          </button>
          <button className="deleteAccount" onClick={this.deleteAccount}>
            Delete Account
          </button>
        </div>
      );
    }
  };

  renderListing = () => {
    if (this.state.myRecipes.length > 1) {
      this.state.myRecipes.map(recipe => {
        return <Recipe key={recipe.id} {...recipe} />;
      });
    } else {
      return (
        <h3 className="noRecipe">
          {this.props.match.params.user_name} has no recipes currently
        </h3>
      );
    }
  };

  render() {
    console.log(this.state);
    // const firstName =
    //   this.state.profileData.name.split(' ')[0] || this.state.profileData.name;
    return (
      <div className="Profile">
        <div className="section">
          <h1 className="profile-name">MEET {this.state.first_name}</h1>
          <div className="container">
            <a className="profile-email" href="#profile-email">
              {this.state.profileData.email}
            </a>
            <span className="profile-date_created">
              Member Since: {this.state.profileData.date_created}
            </span>
          </div>
          {this.accountOption()}
        </div>
        <div className="section">
          <h1>Want to make this?</h1>
          <div className="container">{this.renderRecipe()}</div>
        </div>
      </div>
    );
  }
}
