import React from "react";
import MealCard from "../../meals/mealCard/MealCard";

function DisplayAttendances({ period, meals }) {
  console.log("MEAL ATTENDANCE", meals);
  return (
    <>
      <div className="flex flex-wrap">
        {period === "past"
          ? meals
              .filter((meal) => new Date(meal.starting_date) < Date.now())
              .map((meal) => <MealCard mealData={meal} />)
          : meals
              .filter((meal) => new Date(meal.starting_date) >= Date.now())
              .map((meal) => <MealCard mealData={meal} />)}
      </div>
    </>
  );
}

export default DisplayAttendances;
