import React from "react";
import defaultImage from "./meal-image-default.jpeg";
import "./MealCard.scss";

function MealImage({ image }) {
  return (
    <div>
      {image ? (
        <img src={image} alt="meal" className="mealcard-image" />
      ) : (
        <img src={defaultImage} alt="meal" className="mealcard-image" />
      )}
    </div>
  );
}

export default MealImage;
