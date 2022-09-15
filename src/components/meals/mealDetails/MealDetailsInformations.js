import React from "react";
import SubsectionTitle from "../../titles/SubsectionTitle";
import Wine from '../../../icons/Wine';
import Shrimp from '../../../icons/Shrimp';
import "./MealDetailsInformations.scss";
import UserBlack from "../../../icons/UserBlack";
import Peanuts from "../../../icons/Peanuts";
import Meal from "../../../icons/Meal";
import DoggyBag from "../../../icons/DoggyBag";

const MealDetailsInformations = ({ meal }) => {
  console.log(meal);
  return (
    <div className="meal-detail-right-bottom-container">
      <SubsectionTitle>Informations</SubsectionTitle>
      <ul>

          
        <li className="icon">
        <Shrimp/>
          {meal.animals ? "Animaux accepté" : "Animaux non-accepté"}</li>


        
        <li className="icon">
        <Wine/>
          {meal.alcool ? "Alcool autorisé": "Alcool non-autorisé"}</li>

          
        <li className="icon">
        <UserBlack/>
          {meal.guest_registered} Invités</li>


        <li className="allergen icon">
          <Peanuts/>
          {meal.allergens.map((allergen) => (
            <p>{allergen}</p>
          ))}
        </li>

        <li className="icon">
          <Meal/>
          {meal.diet_type.map((diet) => (
            <p>{diet}</p>
          ))}
        </li>


        <li className="icon">
          <DoggyBag/>
          {meal.doggybag ? "Doggybag autorisé" : "Doggybag non-autorisé"}</li>

      </ul>
    </div>
  );
};

export default MealDetailsInformations;
