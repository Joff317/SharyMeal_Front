import React from "react";
import "./MealDetailsTitle.scss";
import MealPrice from "../mealCard/MealPrice";

const MealDetailsTitle = ({ meal }) => {
  return (
    <div className="title-cat">
      <div className="title-price relative">
        {/* <div className="under"> */}
        <h1 className="under">{meal.title}</h1>
        {/* </div> */}
        <p className="price">{meal.price} €</p>
      </div>
      <div className="category">
        <p>Categories :</p>
        {meal.categories.map((cat) => (
          <p className="categories">
            {meal.categories.indexOf(cat) !== meal.categories.length - 1
              ? `${cat.label},`
              : cat.label}
          </p>
        ))}
      </div>
    </div>
  );
};

export default MealDetailsTitle;
