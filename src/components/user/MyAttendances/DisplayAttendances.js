import React, { useState, useEffect } from "react";
import MealCard from "../../meals/mealCard/MealCard";
import CreateReview from "../../reviews/CreateReview";
import SectionTitle from "../../titles/SectionTitle";

function DisplayAttendances({ period, meals, forceUpdate }) {
  const [today, setToday] = useState();
  const [yesterday, setYesterday] = useState();

  useEffect(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    setToday(today.setHours(0, 0, 0));
    setYesterday(yesterday.setHours(0, 0, 0));
  }, []);

  return (
    <>
      {period === "past" && meals.length !== 0 && (
        <p className="mx-2 mt-2 font-book-font">
          Vous pouvez maintenant rédiger un avis sur vos hôtes, sélectionnez le
          boutton arrondi sur un repas pour poster votre avis
        </p>
      )}
      {period === "past" && meals.length === 0 && (
        <p className="mt-4 max-w-[500px] font-book-font">
          Vous n'avez pas encore participé à des repas, commencez dès maintenant
          ! !
        </p>
      )}
      {period === "future" && meals.length === 0 && (
        <p className="mt-4 max-w-[500px] font-book-font">
          Vous n'avez pas encore réservé de repas, rendez vous sur la page
          d'accueil, choisissez un plat et lancez vous !
        </p>
      )}
      <div className="flex flex-wrap mt-4">
        {period === "past"
          ? meals
              .filter((meal) => new Date(meal.starting_date) <= today)
              .map((meal, index) => (
                <>
                  <MealCard
                    key={index}
                    mealData={meal}
                    showAdditionalInfoReview
                    forceUpdate={forceUpdate}
                  />
                </>
              ))
          : meals
              .filter((meal) => new Date(meal.starting_date) > today)
              .map((meal, index) => (
                <>
                  {/* {yesterday && yesterday.toString()} / {new Date(meal.starting_date).toString()} */}
                  <MealCard mealData={meal} key={index} launchAnimation />
                </>
              ))}
      </div>
    </>
  );
}

export default DisplayAttendances;
