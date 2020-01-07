import React from "react";
import RecipeHelper from "../Helpers/Recipe";
import { Link } from "react-router-dom";
import Context from "../Components/Context";

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
        }) +
        RecipeHelper.getRecipeOwnerData(recipeData.owner).then(ownerData => {
          this.setState({ owner: ownerData });
        })
    );
  }

  deleteRecipe = () => {
    RecipeHelper.delete(this.props.match.params.recipeid).then(
      this.props.history.push("/")
    );
  };

  deleteOption = () => {
    if (this.context.currentUser.id === this.state.recipe.owner) {
      return <button onClick={this.deleteRecipe}>Delete Recipe</button>;
    }
  };

  ownerOption = () => {
    if (this.context.currentUser.id === this.state.recipe.owner) {
      return (
        <div className="ownerSelectors">
          <Link
            className="editRecipe"
            to={`/Edit-Recipe/${this.state.recipe.id}`}
          >
            Edit Recipe
          </Link>
          <button className="deleteRecipe" onClick={this.deleteRecipe}>
            Delete Recipe
          </button>
        </div>
      );
    }
  };

  render() {
    console.log(this.state);
    return (
      <div className="view">
        <div className="image-container">
          <div
            className="image"
            style={{ backgroundImage: `url(${this.state.recipe.image})` }}
          />
        </div>
        <h2 className="recipe-title">{this.state.recipe.title}</h2>
        <h3 className="recipeDescription">
          {this.state.recipe.recipe_description}
        </h3>
        <h4 className="recipeIngredients">
          {this.state.recipe.recipe_ingredients}
        </h4>
        <h5 className="recipeOwner">{this.state.recipe.owner}</h5>
        <span className="recipe-date_created">
          Posted On: {this.state.recipe.date_created}
        </span>
        <p className="recipe-description">
          {this.state.recipe.recipe_description}
        </p>
        <div>{this.deleteOption()}</div>
        <div>{this.ownerOption()}</div>
      </div>
    );
  }
}
