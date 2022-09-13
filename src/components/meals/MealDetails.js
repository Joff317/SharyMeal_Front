import React, { useEffect } from 'react';
import { API } from "../../utils/variables"
import { useParams } from 'react-router-dom';

function MealDetails() {

    const mealId = useParams().mealId


    useEffect(() => {
        fetch(API + `meals/${mealId}`)
        .then(res => res.json())
        .then(data => console.log(data))
    }, [])

    return (
        <div>
            MEAL DETAILS
        </div>
    );
}

export default MealDetails;