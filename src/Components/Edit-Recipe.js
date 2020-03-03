import React from "react";
import { Link } from "react-router-dom";
import Context from "./Context";
import RecipeHelper from "../Helpers/Recipe";
import "../Styles/Buttons.css";
import _ from "lodash"
export default class EditRecipe extends React.Component {
  static contextType = Context;
  static defaultProps = {
    location: {},
    history: {
      push: () => { }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
    };
  }

  componentDidMount() {
    if (!this.context.hasAuthToken()) {
      this.props.history.push("/Login");
    }
    RecipeHelper.recipeById(_.get(this, "props.match.params.recipeid")).then(
      data => {
        this.setState({ recipe: data });
      })
  }

  handleEditSuccess = () => {
    const { history } = this.props;
    history.push(`/recipes/${this.state.recipe.id}`);
  };

  editSubmit = e => {
    e.preventDefault();
    console.log(this.state, "this is current state")
    let title = e.target.title.value;
    let recipe_description = e.target.recipe_description.value;
    let recipe_ingredients = e.target.recipe_ingredients.value;
    let time_to_make = e.target.time_to_make.value;


    this.setState({ error: null });
    RecipeHelper.updateRecipe(
      {
        id: this.state.recipe.id,
        title,
        recipe_description,
        recipe_ingredients,
        time_to_make,
      },
      this.state.recipe.id
    )
      .then(recipe => {
        if (!recipe.ok) { this.setState({ error: !recipe.ok }) }
        else {
          this.handleEditSuccess();
          title = "";
          recipe_description = "";
          recipe_ingredients = "";
          time_to_make = "";
        }
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    return (
      <div className="EditRecipe">
        <header className="Creation-Header"></header>
        <form className="Creation-Form" onSubmit={this.editSubmit}>
          <label className="field a-field a-field_a2">
            <input
              className="field__input a-field__input"
              required
              name="title"
              placeholder="Title"
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label"></span>
            </span>
          </label>
          <label className="field a-field a-field_a2">
            <input
              className="field__input a-field__input"
              required
              type="textfield"
              name="recipe_description"
              placeholder="Description"
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label"></span>
            </span>
          </label>
          <label>
            <input
              className="field__input a-field__input"
              required
              type="text"
              name="recipe_ingredients"
              placeholder="Ingredients"
            />
            <span className="a-field__label"></span>
          </label>
          <label>
            <input
              className="field__input a-field__input"
              required
              type="text"
              name="time_to_make"
              placeholder="Time to make it?"
            />
            <span className="a-field__label"></span>
          </label>
          <div className="btn-row">
            <button className="submitRecipeEdit">Submit</button>
            <Link to="/">
              <button className="cancelEditRecipe">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    );
  };
}
