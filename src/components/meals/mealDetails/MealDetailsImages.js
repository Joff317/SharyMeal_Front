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
        src={
          meal.image_urls.length > 0 ? meal.image_urls[0] : MealDetailsImage1
        }
        alt=""
      />

      <img
        className="box-2"
        src={
          meal.image_urls.length > 1 ? meal.image_urls[1] : MealDetailsImage2
        }
        alt=""
      />

      <img
        className="box-3"
        src={
          meal.image_urls.length > 2 ? meal.image_urls[2] : MealDetailsImage3
        }
        alt=""
      />

      <img
        className="box-4"
        src={
          meal.image_urls.length > 3 ? meal.image_urls[3] : MealDetailsImage4
        }
        alt=""
      />

      <img
        className="box-5"
        src={
          meal.image_urls.length > 4 ? meal.image_urls[4] : MealDetailsImage5
        }
        alt=""
      />

      <img
        className="box-6"
        src={
          meal.image_urls.length > 5 ? meal.image_urls[5] : MealDetailsImage6
        }
        alt=""
      />
    </div>
  );
};

export default MealDetailsImages;
