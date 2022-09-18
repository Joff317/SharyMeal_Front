import React from "react";
import "./MealCard.scss";
function MealPrice({ price }) {
  return <div className="meal-price-button">{price} €</div>;
}

export default MealPrice;
