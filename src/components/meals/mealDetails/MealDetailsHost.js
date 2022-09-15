import React from 'react';
import StartDate from '../../../icons/StartDate';
import UserBlack from '../../../icons/UserBlack';
import './MealDetailsHost.scss'

const MealDetailsHost = ({meal}) => {
   return (
      <div className='host'>
         <div className="user">
         <UserBlack/>
         <p>{meal.host.name}</p>
         </div>
         <div className="date">
         <StartDate/>
         <h5> {meal.starting_date}</h5>
         </div>
      </div>
   );
};

export default MealDetailsHost;