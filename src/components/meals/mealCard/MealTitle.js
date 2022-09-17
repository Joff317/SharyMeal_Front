import React from "react";
import { Link } from "react-router-dom";

function MealTitle({ title, mealId }) {
  return (
    <Link to={`/meals/${mealId}`} className="text-white text-2xl">
      {title}
    </Link>
  );
}

export default MealTitle;
