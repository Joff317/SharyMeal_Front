import React from 'react';
import { Link } from 'react-router-dom';
import MealImage from './MealImage';
import MealPrice from './MealPrice';
import MealAvatar from './MealAvatar';
import './MealCard.scss'
import MealTitle from './MealTitle';
import MealStartingDate from './MealStartingDate';


function MealCard({mealData}) {
    return (
        <Link to={`/meals/${mealData.id}`}>
            <div key={mealData.id}  className='mealcard-container'>
                <MealImage image={mealData.image_urls[0]}/>
                <MealPrice price={mealData.price}/>
                <MealAvatar host={mealData.host}/>
                <MealTitle title={mealData.title}/>
                <MealStartingDate date={mealData.starting_date}/>
            </div>
        </Link>
    );
}

export default MealCard;