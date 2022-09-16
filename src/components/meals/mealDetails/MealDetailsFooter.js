import React, { useState } from 'react';
import './MealDetailsFooter.scss'
import Button from "../../../components/actions/Button";
import Check from '../../../icons/Check';


const MealDetailsFooter = ({meal}) => {
   const [counter, setCounter] = useState(1)
   const incrementCounter = () => setCounter(counter + 1)
   let decrementCounter = () => setCounter(counter - 1)

   if(counter <= 0){
      decrementCounter = () => setCounter(1)
   }

   const handleChange = (e)=>{
      setCounter(e.target.value);
     }

   return (
      <div className='meal-details-footer-top'>
         <div className="left-footer">
            <p className='meal-title'>{meal.title},</p>
             <p className='host-name'> by {meal.host.name}</p>
         </div>

         <div className="right-footer">
            <p className='fork'>Couvert : </p>
            <div className="button-wrapper">
            <span className='minus' onClick={decrementCounter}>-</span>
            <span className='num' onChange={handleChange}>{counter}</span>
            <span className='plus' onClick={incrementCounter}>+</span>
            </div>
            <button className='ml-[50px]'>
               <Button showText={true}>Réserver</Button> 
            </button>
         </div>
      </div>
   );
};

export default MealDetailsFooter;