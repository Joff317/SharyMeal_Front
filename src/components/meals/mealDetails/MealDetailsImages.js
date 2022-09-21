import React from "react";
import MealDetailsImage1 from "../../../assets/images/mealDetailsImage/MealDetailsImage1.jpeg";
import MealDetailsImage2 from "../../../assets/images/mealDetailsImage/MealDetailsImage2.jpeg";
import MealDetailsImage3 from "../../../assets/images/mealDetailsImage/MealDetailsImage3.jpeg";
import MealDetailsImage4 from "../../../assets/images/mealDetailsImage/MealDetailsImage4.jpeg";
import MealDetailsImage5 from "../../../assets/images/mealDetailsImage/MealDetailsImage5.jpeg";
import MealDetailsImage6 from "../../../assets/images/mealDetailsImage/MealDetailsImage6.jpeg";
import "./MealDetailsImages.scss";

const MealDetailsImages = ({ meal }) => {
  return (
    <div className="meal-detail-left-container">
      <img
        className="box-1"
        src={meal.image_urls ? meal.image_urls[0] : MealDetailsImage1}
        alt="First-details-meal"
      />

      <img
        src={meal.image_urls ? meal.image_urls[1] : MealDetailsImage2}
        alt="Second-details-meal"
        className="box-2"
      />

      <img
        className="box-3"
        src={meal.image_urls ? meal.image_urls[2] : MealDetailsImage3}
        alt="Third-details-meal"
      />

      <img
        className="box-4"
        src={meal.image_urls ? meal.image_urls[3] : MealDetailsImage4}
        alt="Fourth-details-meal"
      />

      <img
        className="box-5"
        src={meal.image_urls ? meal.image_urls[4] : MealDetailsImage5}
        alt="Fifth-details-meal"
      />

      <img
        className="box-6"
        src={meal.image_urls ? meal.image_urls[5] : MealDetailsImage6}
        alt="sixth-details-meal"
      />
    </div>
  );
};

export default MealDetailsImages;
