import React from "react";
import { Link } from "react-router-dom";
import Recipe from "../Helpers/Recipe";
import Context from "../Components/Context";
import RecipeHelper from "../Helpers/Recipe";

export default class CreateRecipe extends React.Component {
  static contextType = Context;
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      recipe: {}
    };
  }

  ownerCheck = () => {
    if (this.context.currentUser.id !== this.state.recipe.owner) {
      return this.nonOwner();
    } else {
      return this.owner();
    }
  };

  componentDidMount() {
    if (!this.context.hasAuthToken()) {
      this.props.history.push("/Login");
    }
    RecipeHelper.recipeById(this.props.match.params.recipeid).then(data => {
      this.setState({ recipe: data });
    });
  }

  handleEditSuccess = () => {
    const { history } = this.props;
    history.push("/Dashboard");
  };

  editSubmit = ev => {
    ev.preventDefault();
    const {
      title,
      recipe_description,
      recipe_ingredients,
      time_to_make
    } = ev.target;

    this.setState({ error: null });
    Recipe.updateRecipe(
      {
        title: title.value,
        recipe_description: recipe_description.value,
        recipe_ingredients: recipe_ingredients.value,
        time_to_make: time_to_make.value,
        owner: this.context.currentUser.id,
        date_created: new Date()
      },
      this.state.recipe.id
    )
      .then(recipe => {
        title.value = "";
        recipe_description.value = "";
        recipe_ingredients.value = "";
        time_to_make.value = "";
        this.handleEditSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  nonOwner = () => {
    console.log("rendering nonowner");
    return <h2>Error: you're not the owner of this recipe</h2>;
  };
  owner = () => {
    console.log("rendering owner");
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
              <span className="a-field__label">Title</span>
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
              <span className="a-field__label">Description</span>
            </span>
          </label>
          <label className="field a-field a-field_a2">
            <input
              className="field__input a-field__input"
              required
              type="text"
              name="image"
              placeholder="Image url"
            />
            <span className="a-field__label-wrap">
              <span className="a-field__label">Image url</span>
            </span>
          </label>
          <div className="btn-row">
            <button className="submitLogin">Submit</button>
            <Link to="Dashboard">
              <button className="newAccount">Cancel</button>
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
