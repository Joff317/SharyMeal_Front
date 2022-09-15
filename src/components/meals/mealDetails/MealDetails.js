import React, { useEffect, useState } from "react";
import { API } from "../../../utils/variables";
import { useParams } from "react-router-dom";
import "./MealDetails.scss";
import MealDetailsImages from "./MealDetailsImages";
import MealDetailsTitle from "./MealDetailsTitle";
import MealDetailsHost from "./MealDetailsHost";
import MealDetailsDescription from "./MealDetailsDescription";
import MealDetailsInformations from "./MealDetailsInformations";

function MealDetails() {
  const [meal, setMeal] = useState();
  const mealId = useParams().mealId;

  useEffect(() => {
    fetch(API + `meals/${mealId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMeal(data);
      });
  }, []);

  return (
    <div className="meal-detail-container">
      {meal && (
        <>
          <div className="top-detail-container">
            <MealDetailsImages/>
            <div className="meal-detail-right-container">
              <div className="meal-detail-right-top-container">
                <MealDetailsTitle meal={meal}/>
                <MealDetailsHost meal={meal}/>
              </div>

             <MealDetailsDescription meal={meal}/>

             <MealDetailsInformations meal={meal}/>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MealDetails;
