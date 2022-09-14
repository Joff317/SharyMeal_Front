import React from "react";
import { Link } from "react-router-dom";
import MealImage from "./MealImage";
import MealPrice from "./MealPrice";
import MealAvatar from "./MealAvatar";
import "./MealCard.scss";
import MealTitle from "./MealTitle";
import MealStartingDate from "./MealStartingDate";
import defaultImage from "./meal-image-default.jpeg";

function MealCard({ mealData }) {
  console.log("Mealdata fouk", mealData);
  return (
    <Link to={`/meals/${mealData.id}`}>
      <div
        key={mealData.id}
        className="mealcard-container flex flex-col justify-end gap-1"
      >
        <div className="flex gap-1 text-white">
          {mealData.categories.map((category) => (
            <p> {category.label} </p>
          ))}
        </div>
        <div className="layer-blur"> </div>

        {mealData.images ? (
          <img src={mealData.images} alt="meal" className="mealcard-image" />
        ) : (
          <img src={defaultImage} alt="meal" className="mealcard-image" />
        )}

        <MealPrice price={mealData.price} />
        <MealTitle title={mealData.title} />
        <div className="flex gap-2 items-center">
          <MealAvatar host={mealData.host} />
          <p className="text-white text-base font-book-font">
            {" "}
            {mealData.host.name}{" "}
          </p>
        </div>

        <MealStartingDate date={mealData.starting_date} />
      </div>
    </Link>
  );
}

export default MealCard;
