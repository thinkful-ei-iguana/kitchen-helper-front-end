import React from "react";
import RecipeHelper from "../Helpers/Recipe";
import { Link } from "react-router-dom";
import Context from "./Context";
import "../Styles/Buttons.css";
import "../Styles/Recipe.css";

export default class DetailedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      owner: {}
    };
  }

  static contextType = Context;
  static defaultProps = {
    match: { params: {} }
  };

  componentDidMount() {
    const { recipeid } = this.props.match.params;
    RecipeHelper.recipeById(recipeid).then(
      recipeData =>
        this.setState({
          recipe: recipeData
        })
      // RecipeHelper.getRecipeOwnerData(recipeData.owner).then(ownerData => {
      //   this.setState({ owner: ownerData });
      // })
    );
  }

  deleteRecipe = () => {
    RecipeHelper.delete(this.props.match.params.recipeid).then(
      this.props.history.push("/Home")
    );
  };

  deleteOption = () => {
    if (this.context.currentUser.id === this.state.recipe.owner) {
      return (
        <div className="delete-recipe-button-div">
          <button className="delete-recipe-button" onClick={this.deleteRecipe}>
            Delete Recipe
          </button>
        </div>
      );
    }
  };

  ownerOption = () => {
    if (this.context.currentUser.id === this.state.recipe.owner) {
      return (
        <div className="ownerSelectors">
          <Link
            className="editRecipe"
            to={`/edit-recipe/${this.state.recipe.id}`}
          >
            Edit Recipe
          </Link>
        </div>
      );
    }
  };

  render() {
    return (
      <>
        <div className="view">
          <div className="image-container">
            <div
              className="image"
              style={{ backgroundImage: `url(${this.state.recipe.image})` }}
            />
          </div>
          <p className="recipe-title">Title:</p>
          <h2 className="recipe-title">{this.state.recipe.title}</h2>
          <p className="recipeDescription">Recipe Description: </p>
          <h3 className="recipeDescription">
            {this.state.recipe.recipe_description}
          </h3>
          <p className="recipeIngredients">Recipe Ingredients:</p>
          <h3 className="recipeIngredients">
            {this.state.recipe.recipe_ingredients}
          </h3>
          <p className="timeToMakeRecipe">Time to make the recipe:</p>
          <h3 className="timeToMakeRecipe">{this.state.recipe.time_to_make}</h3>
          <p className="recipeOwner">Owner:</p>
          <h3 className="recipeOwner">{this.state.recipe.owner}</h3>
          <div className="recipe-date_created">
            <span className="recipe-date_created">
              Date Created: {this.state.recipe.date_created}
            </span>
          </div>
          <div>{this.deleteOption()}</div>
          <div>{this.ownerOption()}</div>
          <Link to="/Home">
            <button className="cancel-view">Cancel</button>
          </Link>
        </div>
      </>
    );
  }
}
