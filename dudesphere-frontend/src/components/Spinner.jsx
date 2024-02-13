import React from 'react'
import {ThreeCircles} from 'react-loader-spinner';

const Spinner = ({message}) => {
return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <ThreeCircles
            visible={true}
            height="100"
            width="300"
            color = "#22c55e"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
        />
        <p className='text-lg text-center px-2'>
            {message}
            
        </p>
    </div>
)
}

export default Spinner;