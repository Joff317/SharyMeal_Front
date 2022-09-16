import React from 'react';
import ReactLoading from 'react-loading';

function Loader({ type, color }) {
    return (
        <div className='w-50 align-self-center'>
            <ReactLoading type={type} color={color} height={600} width={300} />
        </div>
    );
}

export default Loader;