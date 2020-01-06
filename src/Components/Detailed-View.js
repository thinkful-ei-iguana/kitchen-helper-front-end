import React from "react";
import RecipeHelper from "../Helpers/Recipe";
import { Link } from "react-router-dom";
import Context from "../Context/Context";

export default class DetailedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {}
    };
  }

  static contextType = Context;
  static defaultProps = {
    match: { params: {} }
  };

  componentDidMount() {
    const { recipeid } = this.props.match.params;
    RecipeHelper.recipeById(recipeid).then(recipeData =>
      this.setState({
        recipe: recipeData
      })
    );
  }

  deleteRecipe = () => {
    RecipeHelper.delete(this.props.match.params.recipeid).then(
      this.props.history.push("/Home")
    );
  };

  deleteOption = () => {
    if (this.context.currentUser.user_name === this.state.recipe.owner) {
      return <button onClick={this.deleteRecipe}>Delete Recipe</button>;
    }
  };

  render() {
    return (
      <div className="view">
        <div className="image-container">
          <div
            className="image"
            style={{ backgroundImage: `url(${this.state.recipe.image})` }}
          />
        </div>
        <h2 className="recipe-title">{this.state.recipe.title}</h2>
        <span className="recipe-date_created">
          Posted On: {this.state.recipe.date_created}
        </span>
        <p className="recipe-description">
          {this.state.recipe.recipe_description}
        </p>
        <div className="owner">
          <span>Posted By: </span>
          <Link
            to={`/user/${this.state.recipe.owner}`}
            className="recipe-owner"
          >
            {this.state.recipe.owner}
          </Link>
        </div>
        <div>{this.deleteOption()}</div>
      </div>
    );
  }
}
