import React from "react";
import SubsectionTitle from "../../titles/SubsectionTitle";
import Wine from "../../../icons/Wine";
import Shrimp from "../../../icons/Shrimp";
import "./MealDetailsInformations.scss";
import UserBlack from "../../../icons/UserBlack";
import Peanuts from "../../../icons/Peanuts";
import Meal from "../../../icons/Meal";
import DoggyBag from "../../../icons/DoggyBag";

const MealDetailsInformations = ({ meal }) => {

  console.log('meal', meal);
  return (
    <div className="meal-detail-right-bottom-container">
      <SubsectionTitle>Informations</SubsectionTitle>
      <ul>
        <li className="icon">
          <Shrimp />
          {meal.animals ? "Animaux acceptés" : "Animaux non-acceptés"}
        </li>

        <li className="icon">
          <Wine />
          {meal.alcool ? "Alcool autorisé" : "Alcool non-autorisé"}
        </li>

        <li className="icon">
          <UserBlack />
           Réservations : {meal.guest_registered && meal.guest_registered} / {meal.guest_capacity && meal.guest_capacity} 
        </li>

        <li className="icon">
          <DoggyBag />
          {meal.doggybag ? "Doggybag autorisé" : "Doggybag non-autorisé"}
        </li>

        <li className="allergen icon">
          <Peanuts />
          <div>
            {meal.allergens &&
              meal.allergens.map((allergen, index) => (
                <p key={index}>{allergen}</p>
              ))}
          </div>
        </li>

        <li className="icon">
          <Meal />
          <div>
            {meal.diet_type &&
              meal.diet_type.map((diet, index) => <p key={index}>{diet}</p>)}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MealDetailsInformations;
