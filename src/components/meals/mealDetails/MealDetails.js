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
import MyHostedMeals from "../../user/MyHostedMeals";
import Loader from "../../Loader";
import { useAtomValue } from "jotai";
import { currentuserAtom } from "../../../atoms/loggedAtom";

function MealDetails() {
  const [meal, setMeal] = useState();
  const [hostedMeals, setHostedMeals] = useState();
  const [hostAvatar, setHostavatar] = useState();
  const currentUserAtom = useAtomValue(currentuserAtom);
  const mealId = useParams().mealId;

  useEffect(() => {
    fetch(API + `meals/${mealId}`)
      .then((res) => res.json())
      .then((data) => {
        setMeal(data.meal);
        setHostedMeals(data.hosted_meals);
        setHostavatar(data.host_avatar);
        document.documentElement.scrollTop = 0;
      });
  }, []);

  return (
    <>
      {meal ? (
        <div className="meal-detail-container">
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

          <MealHostProfile
            meal={meal}
            hostedMeals={hostedMeals}
            hostAvatar={hostAvatar}
          />
          {currentUserAtom.id !== meal.host.id && (
            <MealDetailsFooter meal={meal} />
          )}
        </div>
      ) : (
        <>
          <Loader type="spinningBubbles" color="#292929" />
        </>
      )}
    </>
  );
}

export default MealDetails;
