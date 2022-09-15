import React from "react";
import MealDetailsImage1 from "../../../assets/images/mealDetailsImage/MealDetailsImage1.jpeg";
import MealDetailsImage2 from "../../../assets/images/mealDetailsImage/MealDetailsImage2.jpeg";
import MealDetailsImage3 from "../../../assets/images/mealDetailsImage/MealDetailsImage3.jpeg";
import MealDetailsImage4 from "../../../assets/images/mealDetailsImage/MealDetailsImage4.jpeg";
import MealDetailsImage5 from "../../../assets/images/mealDetailsImage/MealDetailsImage5.jpeg";
import MealDetailsImage6 from "../../../assets/images/mealDetailsImage/MealDetailsImage6.jpeg";
import "./MealDetailsImages.scss";

const MealDetailsImages = () => {
  return (
    <div className="meal-detail-left-container">

        <img className="box-1" src={MealDetailsImage1} alt="" />



        <img className="box-2" src={MealDetailsImage2} alt="" />


        <img className="box-3" src={MealDetailsImage3} alt="" />
 

        <img className="box-4" src={MealDetailsImage4} alt="" />


        <img className="box-5" src={MealDetailsImage5} alt="" />


        <img className="box-6" src={MealDetailsImage6} alt="" />

      
    </div>
  );
};

export default MealDetailsImages;
