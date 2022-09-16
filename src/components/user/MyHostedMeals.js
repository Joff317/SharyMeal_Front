import React from "react";
import MealCard from "../meals/mealCard/MealCard";
import SubsectionTitle from "../titles/SubsectionTitle";

function MyHostedMeals({ userData, forceUpdate }) {
  return (
    <>
      <SubsectionTitle> Les repas que vous avez organisés </SubsectionTitle>
      <br />
      <div className="flex flex-wrap">
        {userData &&
          userData.hosted_meals.map((hosted_meal) => (
            <MealCard
              mealData={hosted_meal}
              showAdditionalInfo
              forceUpdate={forceUpdate}
            />
          ))}
      </div>
    </>
  );
}

export default MyHostedMeals;
