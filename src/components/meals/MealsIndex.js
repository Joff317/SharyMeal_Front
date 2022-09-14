import React, { useEffect, useState } from 'react';
import { API } from "../../utils/variables"
import MealCard from './mealCard/MealCard';
import './MealsIndex.scss'

function MealIndex() {

    const [ mealsIndex, setMealsIndex ] = useState(null)
   

    useEffect(() => {
        console.log('API', API);

        fetch(API + 'meals')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setMealsIndex(data);
        })
    }, [])

    return (
        <div>
            <p>Discover food experiences around you</p>
            <p>Icones des catégories de repas</p>
            <p>Bouton des filtres  + Toggle Map mode</p>

            <div id="meals-index-container">

                {
                    mealsIndex && mealsIndex.map(meal => (
                       <MealCard mealData={meal}/>
                    ))
                }

            </div>
        </div>
    );
}

export default MealIndex;