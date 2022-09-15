import React, { useEffect, useState } from "react";
import { API } from "../../../utils/variables";
import { useParams } from "react-router-dom";
import image1 from "../../assets/images/imagehome1.jpeg";
import "./MealDetails.scss";

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
            <div className="meal-detail-left-container">
              <img src={image1} alt="" />
            </div>
            <div className="meal-detail-right-container">
              <div className="meal-detail-right-top-container">
                <div className="title-cat">
                  <h1 className="title">{meal.title}</h1>
                  <div className="categories">
                    <p>Categories :</p>
                    {meal.categories.map((cat) => (
                      <p>{cat.label}</p>
                    ))}
                  </div>
                </div>
                <p>{meal.host.name}</p>
                <h5>{meal.starting_date}</h5>
              </div>

              <div className="meal-description-container">
                <h2 className="title1">Description</h2>
                <p>{meal.description}</p>
              </div>

              <div className="meal-detail-right-bottom-container">
                <h2 className="title1">Informations</h2>
                <ul>
                  <li>{meal.animals ? meal.animals : "non accepté"}</li>
                  <li>{meal.alcool ? meal.alcool : "pas d'alcool"}</li>
                  <li>{meal.guest_registered} Invités</li>
                  <li>
                    {meal.allergens.map((allergen) => (
                      <p>{allergen}</p>
                    ))}
                  </li>
                  <li>
                    {meal.diet_type.map((diet) => (
                      <p>{diet}</p>
                    ))}
                  </li>
                  <li>
                    {meal.doggybag ? meal.doggybag : "doggybag non autorisé"}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MealDetails;
