import React from 'react';
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function PlacesFilter({places, setPlaces}) {

    const handlePlaces = (e, places) => {
		setPlaces(places)
	};


    return (
        <div className='mt-3 ml-8'>
         <p>Nombre de places disponibles</p>
         <div className='flex gap-4 items-center ml-[-10px]'>

         <span>&#12296; 0</span> 
         <Box sx={{ width: 200 }}>
         <Slider
            getAriaLabel={() => "Temperature range"}
            value={places}
            onChange={handlePlaces}
            valueLabelDisplay='auto'
            max={12}
         />
         </Box>
         <span>{places} &#12297;</span>
         </div>
      </div>
    );
}

export default PlacesFilter;