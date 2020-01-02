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
    return fetch(`${config.API_ENDPOINT}/recipes/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  delete(id) {
    return fetch(`${config.API_ENDPOINT}/recipes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${config.API_TOKEN}`
      }
    });
  },
  getAllMyRecipes(user_name) {
    return fetch(`${config.API_ENDPOINT}/recipes/${user_name}`).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }

  // get listing by owner
  // post listing
  // patch listing
  // delete listing
};

export default RecipeHelper;
