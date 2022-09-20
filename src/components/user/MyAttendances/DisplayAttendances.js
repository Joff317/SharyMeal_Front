import React, { useState } from "react";
import MealCard from "../../meals/mealCard/MealCard";
import CreateReview from "../../reviews/CreateReview";
import SectionTitle from "../../titles/SectionTitle";

function DisplayAttendances({ period, meals }) {
  
  console.log("MEAL ATTENDANCE", meals);
  return (
    <>
    {period === "past" && <p className="mx-2 mt-2">Vous pouvez maintenant rédiger un avis sur vos hôtes, sélectionnez le boutton arrondi sur un repas pour poster votre avis</p>}
      <div className="flex flex-wrap">
        {period === "past"
          ? meals
              .filter((meal) => new Date(meal.starting_date) < Date.now())
              .map((meal) => (<MealCard mealData={meal} showAdditionalInfoReview />))
          : meals
              .filter((meal) => new Date(meal.starting_date) >= Date.now())
              .map((meal) => <MealCard mealData={meal} />)}
      </div>
    </>
  );
}

export default DisplayAttendances;
