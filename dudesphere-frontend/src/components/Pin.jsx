import React , { useState } from 'react';
import { client , urlfor } from '../client';
import { Link , useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOfline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';


const Pin = ({ pin : {postedBy , image , _id , destination}}) => {
const [postHovered, setPostHovered] = useState(false);
const [savingPost, setSavingPost] = useState(false);

const navigate = useNavigate();

return (
    // TODO: Pin Doesn't work within the masonry component
    <div className='m-2'>
        <div 
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
        >
        <img 
        src={urlfor(image).width(250).url()} 
        alt='user-post'
        className='rounded-lg w-full'  />
        {postHovered && (
            <div className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50' style = {{ height: '100%' }}>
                
            </div>
        )}  
        </div>



    </div>
)
}

export default Pin;