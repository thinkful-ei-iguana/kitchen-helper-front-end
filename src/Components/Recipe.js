import React from "react";
import { Link } from "react-router-dom";

export default function Recipe(props) {
  function truncate(text) {
    const words = text.split(" ");
    if (words.length > 2) {
      return words.slice(0, 2).join(" ") + " ...";
    }
    return text;
  }

  return (
    <div className="Results-item">
      <Link to={`/recipe/${props.id}`} className="ThingRecipeItem">
        <div
          className="ThingRecipeItem__image"
          style={{ backgroundImage: `url(${props.image})` }}
        />

        <div className="ThingRecipeItem__details">
          <div className="ThingRecipeItem__text">
            <h2 className="ThingRecipeItem__heading">{props.title}</h2>
            <p className="ThingRecipeItem__description">
              {truncate(props.description)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
