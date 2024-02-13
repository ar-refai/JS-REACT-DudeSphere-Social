import React , { useState } from 'react';
import { client , urlfor } from '../client';
import { Link , userNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOfline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';


const Pin = ({ pin : {postedBy , image , _id , destination}}) => {
const [postHovered, setPostHovered] = useState(false);


return (
    // TODO: Pin Doesn't work within the masonry component
    <div className='m-2'>
        <div onMouseEnter={() => setPostHovered(true)}>
            
        </div>



        <img 
        src={urlfor(image).width(250).url()} 
        alt='user-post'
        className='rounded-lg w-full'  />
    </div>
)
}

export default Pin;