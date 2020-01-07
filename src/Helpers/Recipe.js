import config from "../config";

const RecipeHelper = {
  createRecipe(newRecipe) {
    return fetch(`${config.API_ENDPOINT}/recipes`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(newRecipe)
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  recipeById(id) {
    console.log(id);
    return fetch(`${config.API_ENDPOINT}/recipes/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  getRecipeOwnerData(ownerid) {
    console.log("getting recipe by owner");
    return fetch(`${config.API_ENDPOINT}/recipes/owner/${ownerid}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  search(term) {
    console.log("searching by recipe title");
    return fetch(`${config.API_ENDPOINT}/recipes/search/${term}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  delete(id) {
    console.log("deleting recipe by id");
    return fetch(`${config.API_ENDPOINT}/recipes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${config.TOKEN_KEY}`
      }
    });
  },
  getAllMyRecipes(id) {
    console.log("getting all recipes by owner id");
    return fetch(`${config.API_ENDPOINT}/recipes/user/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  updateRecipe(updatedData, id) {
    console.log("updating recipe");
    return fetch(`${config.API_ENDPOINT}/recipes/edit/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.TOKEN_KEY}`
      },
      body: JSON.stringify(updatedData)
    });
  }

  // get recipe by owner
  // post recipe
  // patch recipe
  // delete recipe
};

export default RecipeHelper;
