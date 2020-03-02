import React from "react";
import ReactDOM from "react-dom";
import CreateRecipe from "./Edit-Recipe";
import { BrowserRouter, Route, Link } from "react-router-dom";
import RecipeHelper from "../Helpers/Recipe";
it("renders without crashing", () => {
  const div = document.createElement("div");
  const routeProps = {
    match: {},
    params: {}
  };
  ReactDOM.render(
    <BrowserRouter>
      <CreateRecipe {...routeProps} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div); //cleanup
});
