import React from "react";
import { Link } from "react-router-dom";
import Context from "./Context";
import RecipeHelper from "../Helpers/Recipe";
import "../Styles/Buttons.css";
import AuthHelper from "../Helpers/Auth";
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
    console.log("component mounted")
    if (!this.context.hasAuthToken()) {
      this.props.history.push("/Login");
    }
    RecipeHelper.recipeById(_.get(this, "props.match.params.recipeid")).then(
      data => {
        this.setState({ recipe: data });
        console.log("component mounted twice")
      })
  }


  ownerCheck = () => {
    console.log(this.context, "this is context")
    console.log(this.state, "this is state")
    if (this.context.currentUser.id !== this.state.recipe.owner) {
      return this.nonOwner();
    } else {
      return this.owner();
    }
  };

  handleEditSuccess = () => {
    const { history } = this.props;
    history.push(`/recipes/${this.state.recipe.id}`);
  };

  editSubmit = e => {
    e.preventDefault();
    console.log("make it here")
    let { title,
      recipe_description,
      recipe_ingredients,
      time_to_make
    } = e.target;

    this.setState({ error: null });
    RecipeHelper.updateRecipe(
      {
        id: this.state.recipe.id,
        title,
        recipe_description,
        recipe_ingredients,
        time_to_make,
        date_created: new Date()
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
  };

  nonOwner = () => {
    console.log("error")
    return <h2>Error: you're not the owner of this recipe</h2>;
  };

  owner = () => {
    return (
      <div className="Creation">
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
            <Link to="/">
              <button className="submitRecipeEdit">Submit</button>
            </Link>
            <Link to="">
              <button className="cancelEditRecipe">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    );
  };
  render() {
    return <div className="Edit">{this.ownerCheck()}</div>;
  }
}
