import React from 'react';
import SubsectionTitle from '../../titles/SubsectionTitle';
import './MealDetailsDescriptions.scss'

const MealDetailsDescription = ({meal}) => {
   return (
      <div className="meal-description-container">
      <SubsectionTitle>Description</SubsectionTitle>
      <p className='description'>{meal.description}</p>
    </div>
   );
};

export default MealDetailsDescription;