import React, { useEffect } from 'react';
import { API } from "../../utils/variables"


function MealIndex() {

   

    useEffect(() => {
        fetch(API + 'meals')
        .then(res => res.json())
        .then(data => console.log(data))
    }, [])

    return (
        <div>
            MEALS INDEX
        </div>
    );
}

export default MealIndex;