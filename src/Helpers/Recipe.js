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
    // console.log("getting recipe by id");
    return fetch(`${config.API_ENDPOINT}/recipes/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  // ${this.recipes.filter(
  //   recipes => recipes.owner === this.recipes.owner
  // )}

  getRecipeOwnerData(id) {
    console.log(id);
    return fetch(`${config.API_ENDPOINT}/recipe/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  search(term) {
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
    return fetch(`${config.API_ENDPOINT}/recipes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${config.TOKEN_KEY}`
      }
    });
  },

  getAllMyRecipes(owner) {
    console.log(owner, "hi");
    console.log("I'm supposed to get every recipe");
    return fetch(`${config.API_ENDPOINT}/recipes/user/${owner}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  updateRecipe(updatedData, id) {
    console.log(updatedData);
    return fetch(`${config.API_ENDPOINT}/recipes/edit/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.TOKEN_KEY}`
      },
      body: JSON.stringify(updatedData)
    });
  }
};

export default RecipeHelper;
