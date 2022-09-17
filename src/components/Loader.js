import React from 'react';
import ReactLoading from 'react-loading';

function Loader({ type, color, height, width }) {
    return (
        <div className='w-50 flex justify-center items-center mt-[100px]'>
            <ReactLoading type={type} color={color} height={600} width={300} />
        </div>
    );
}

export default Loader;