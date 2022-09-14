import React from 'react';
import './MealCard.scss'
function MealPrice({price}) {
    return (
        <div>
            <button className='meal-price-button'>
                {price} €
            </button>
        </div>
    );
}

export default MealPrice;