import React, { useEffect, useState } from "react";
import { API } from "../../../utils/variables";
import { useParams } from "react-router-dom";
import "./MealDetails.scss";
import MealDetailsImages from "./MealDetailsImages";
import MealDetailsTitle from "./MealDetailsTitle";
import MealDetailsHost from "./MealDetailsHost";
import MealDetailsDescription from "./MealDetailsDescription";
import MealDetailsInformations from "./MealDetailsInformations";
import MealDetailsFooter from "./MealDetailsFooter";
import MealHostProfile from "./MealHostProfile";
import MyHostedMeals from '../../user/MyHostedMeals';

function MealDetails() {
  const [meal, setMeal] = useState();
  const [ hostedMeals, setHostedMeals ] = useState();
  const mealId = useParams().mealId;

  useEffect(() => {
    fetch(API + `meals/${mealId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMeal(data.meal);
        setHostedMeals(data.hosted_meals);
      });
  }, []);

  return (
    <div className="meal-detail-container">
      {meal && (
        <>
          <div className="top-detail-container">
            <MealDetailsImages meal={meal} />
            <div className="meal-detail-right-container">
              <div className="meal-detail-right-top-container">
                <MealDetailsTitle meal={meal} />
                <MealDetailsHost meal={meal} />
              </div>

              <MealDetailsDescription meal={meal} />

              <MealDetailsInformations meal={meal} />
            </div>
          </div>
          <MealHostProfile meal={meal} hostedMeals={hostedMeals}/>
          <MealDetailsFooter meal={meal} />
        </>
      )}
    </div>
  );
}

export default MealDetails;
