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
    history.push(`/recipe/${this.state.recipe.id}`);
  };

  editSubmit = e => {
    e.preventDefault();
    try {
      console.log(this.state, "this is current state")
      let { title, recipe_description, recipe_ingredients, time_to_make } = e.target;


      this.setState({ error: null });
      RecipeHelper.updateRecipe(
        {
          title: title.value,
          owner: this.context.currentUser.id,
          recipe_description: recipe_description.value,
          recipe_ingredients: recipe_ingredients.value,
          time_to_make: time_to_make.value,
        },
        this.state.recipe.id
      )
        .then(recipe => {
          if (!recipe.ok) { this.setState({ error: !recipe.ok }) }
          else {
            title.value = "";
            recipe_description.value = "";
            recipe_ingredients.value = "";
            time_to_make.value = "";
            this.handleEditSuccess();
          }
        })
        .catch(res => {
          this.setState({ error: res.error });
        });
    } catch (err) {
      console.log(err)
    }
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
