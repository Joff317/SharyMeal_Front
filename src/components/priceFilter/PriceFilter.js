import React from 'react';
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const PriceFilter = ({setPrice, price}) => {


   const handlePrice = (e, price) => {
		setPrice(price)
      
	};

   return (
    
      <div className='flex gap-14 mt-3 ml-8'>
      <Box sx={{ width: 500 }}>
      <Slider
         getAriaLabel={() => "Temperature range"}
         value={price}
         onChange={handlePrice}
         valueLabelDisplay='auto'
         min={0}
         max={30}
      />
      </Box>
      </div>  
   );
};

export default PriceFilter;