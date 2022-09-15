import React, { useEffect, useState } from 'react';
import { API } from "../../utils/variables"
import { useParams } from 'react-router-dom';
import image1 from "../../assets/images/imagehome1.jpeg";

function MealDetails() {

    const [meal, setMeal] = useState()
    const mealId = useParams().mealId


    useEffect(() => {
        fetch(API + `meals/${mealId}`)
        .then(res => res.json())
        .then(data => {

            console.log(data);
            setMeal(data)})
        
    }, [])

    return (
        <div className='meal-detail-container'>
            {meal &&
            <>
            <div className="meal-detailimage-container">
                <img src={image1} alt="" />
            </div>

            <h1 className='title'>{meal.title}</h1>
            </>
            }
            
        </div>
    );
}

export default MealDetails;