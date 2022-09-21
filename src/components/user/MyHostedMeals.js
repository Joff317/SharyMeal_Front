import React from "react";
import MealCard from "../meals/mealCard/MealCard";
import SubsectionTitle from "../titles/SubsectionTitle";
import { useNavigate } from "react-router-dom";

function MyHostedMeals({ userData, forceUpdate }) {
  const navigate = useNavigate();
  return (
    <>
      <SubsectionTitle> Les repas que vous avez organisés </SubsectionTitle>
      {userData.hosted_meals.length === 0 ? (
        <p className="mt-4 font-book-font">
          Vous n'avez pas encore organisé de repas, rendez vous dans{" "}
          <span
            className="bg-pink px-1 mr-1 cursor-pointer hover:bg-green_light"
            onClick={() => navigate("/create-meal")}
          >
            {" "}
            Proposer un repas{" "}
          </span>{" "}
          et commencez l'aventure !
        </p>
      ) : (
        <div className="flex flex-wrap mt-4">
          {userData &&
            userData.hosted_meals.map((hosted_meal) => (
              <MealCard
                key={hosted_meal.id}
                mealData={hosted_meal}
                showAdditionalInfo
                forceUpdate={forceUpdate}
              />
            ))}
        </div>
      )}
    </>
  );
}

export default MyHostedMeals;
