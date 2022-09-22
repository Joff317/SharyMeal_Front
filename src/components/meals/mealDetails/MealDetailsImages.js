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
          meal.image_urls
            ? meal.image_urls[0]
            : "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1536,h_864/https://devenezchef.fr/wp-content/uploads/2021/05/Photo-damis-en-cuisine-1-1536x864.jpeg"
        }
        alt="First-details-meal"
      />

      <img
        src={
          meal.image_urls && meal.image_urls[1]
            ? meal.image_urls[1]
            : "https://media.istockphoto.com/photos/company-of-friends-or-family-gathering-for-christmas-dinner-picture-id1065495168?k=20&m=1065495168&s=612x612&w=0&h=hkza0ED8Ehsn180XRA0Wvfa73fMLZhXWnviCEhd87CY="
        }
        alt="Second-details-meal"
        className="box-2"
      />

      <img
        className="box-3"
        src={
          meal.image_urls && meal.image_urls[2]
            ? meal.image_urls[2]
            : "https://wordpress.soscuisine.com/2022/02/recette_familles_nombreuses.jpg"
        }
        alt="Third-details-meal"
      />

      <img
        className="box-4"
        src={
          meal.image_urls && meal.image_urls[3]
            ? meal.image_urls[3]
            : MealDetailsImage6
        }
        alt="Fourth-details-meal"
      />

      <img
        className="box-5"
        src={
          meal.image_urls && meal.image_urls[4]
            ? meal.image_urls[4]
            : MealDetailsImage5
        }
        alt="Fifth-details-meal"
      />
    </div>
  );
};

export default MealDetailsImages;
