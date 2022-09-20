import React, { useState } from 'react';
import DisplayAttendances from './DisplayAttendances';

function MyAttendances({userData}) {
    
    const [ period, setPeriod ] = useState('future');

    return (
        <>
        <div className='tabs-container flex'>

            <div className={period === "future" && "bg-green text-white"}>
                <button onClick={() => setPeriod('future')}> Réservations futures </button>
            </div>

            <div className={period === "past" && "bg-green text-white"}>
                <button onClick={() => setPeriod('past')}> Réservations passées </button>
            </div>

        </div>
         
        <DisplayAttendances period={period} meals={userData.guested_meals}/>
        
        </>
    );
}

export default MyAttendances;