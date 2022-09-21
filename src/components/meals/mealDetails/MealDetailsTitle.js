import React from "react";
import "./MealDetailsTitle.scss";

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
        {meal.categories.map((cat, index) => (
          <p className="categories" key={index}>
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
