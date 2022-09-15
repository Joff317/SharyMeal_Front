import React from 'react';
import image1 from "../../../assets/images/imagehome1.jpeg";
import './MealDetailsImages.scss'

const MealDetailsImages = () => {
   return (
      <div className="meal-detail-left-container">
              <img src={image1} alt="" />
      </div>
   );
};

export default MealDetailsImages;