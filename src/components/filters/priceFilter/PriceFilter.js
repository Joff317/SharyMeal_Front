import React from 'react';
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const PriceFilter = ({setPrice, price}) => {

   const handlePrice = (e, price) => {
		setPrice(price)
      
	};

   return (
    
      
      <div className='mt-3 ml-8'>
         <p>Prix du repas</p>
         <div className='flex gap-4 items-center ml-[-10px]'>

         <span>&#12296; {price[0]}€</span> 
         <Box sx={{ width: 200 }}>
         <Slider
            getAriaLabel={() => "Temperature range"}
            value={price}
            onChange={handlePrice}
            valueLabelDisplay='auto'
            min={0}
            max={30}
         />
         </Box>
         <span>{price[1]}€ &#12297;</span>
         </div>
      </div>
   );
};

export default PriceFilter;