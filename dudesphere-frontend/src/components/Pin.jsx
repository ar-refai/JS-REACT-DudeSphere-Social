import React , { useState } from 'react';
import { client , urlfor } from '../client';
import { Link , useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdOutlineDownloadForOffline  } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { fetchUser } from '../utils/fetchUser';
import { motion } from 'framer-motion';
import  { useRef } from "react";
const Pin = ({ pin : {postedBy , image , _id , destination ,save}}) => {
const [postHovered, setPostHovered] = useState(false);
const navigate = useNavigate();
// ----------------------------------------------
// Animation
    const ref = useRef(null);
    const ROTATION_RANGE = 32.5;
    const HALF_ROTATION_RANGE = 32.5 / 2;
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

        const rY = mouseX / width - HALF_ROTATION_RANGE;
        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;

        setRotateX(rX);
        setRotateY(rY);
    };

    const handleMouseLeave = () => {
        if (!ref.current) return;
        setRotateX(0);
        setRotateY(0);
    };

// ----------------------------------------------
const userInfo = fetchUser();
let alreadySaved = !!(save?.filter((item) =>  item?.postedBy?._id === userInfo[0]?.userID))?.length;
// console.log(save);
// console.log(alreadySaved);
//saving new pin
const savePin = (id) => {
    if(!alreadySaved) {
        client  
        .patch(id)
        .setIfMissing({ save: []})
        .insert('after','save[-1]',[{
            _key:uuidv4(),
            userId: userInfo[0]?.userID,
            postedBy: {
                _type:'postedBy',
                _ref:userInfo[0]?.userID,
            }
        }])
        .commit()
        .then(()=>{
            window.location.reload();
        })
    }
}
// delete a pin
const deletePin = (id) => {
    client
    .delete(id)
    .then(()=>{
        window.location.reload();
    })
}

return (

    <motion.div
    initial = {{
        opacity: 0,
        width: 0,
        transition: {duration:.4}
    }}
    animate = {{
        opacity:1,
        width: "100%",
        transition: {duration:.4}
    }}
    exit = {{
        opacity:0,
        x: "-40%",
        transition: {duration:.1}
    }}
    >

        
        <motion.div 
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
            transformStyle: "preserve-3d",
        }}
        animate={{
            rotateX,
            rotateY,
        }}
        className='m-2'
        >
        <motion.div 

        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)} 
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
        style={{
            transform: "translateZ(75px)",
            transformStyle: "preserve-3d",
        }}
        >
        <img 
        src={urlfor(image).width(250).url()} 
        alt='user-post'
        className='rounded-lg w-full'  
        
        />
        {postHovered && (
            <div className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50 ' style = {{ height: '100%' }}
            >
                <div className='flex items-center justify-between'>
                    <div className="flex gap-2">
                        <motion.a 
                        initial = {{
                            x : -100,
                            y: -100
                        }}
                        animate = {{
                            x: 0,
                            y: 0
                        }}
                        href={`${image?.asset?.url}?dl=`} 
                        download 
                        className='bg-zinc-900 w-8 h-8 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-lg border-none outline-none active:scale-[.9]'
                        
                        onClick={(e) => e.stopPropagation()}>
                        <MdOutlineDownloadForOffline  color='white' size={25} className=' rounded-full '/>
                        </motion.a>
                    </div>
                    {alreadySaved ? (
                        <motion.button 
                        initial = {{
                            x : 100,
                            y: -100
                        }}
                        animate = {{
                            x: 0,
                            y: 0,
                        }}
                        
                        whileTap={{scale:.9}}
                        type='button'
                        className='opacity-70 hover:opacity-100 bg-white shadow-xl text-green-950 rounded-3xl font-extrabold px-3 py-1'>
                            {save?.length} Saved
                            </motion.button>
                    ):(
                        <motion.button 
                        initial = {{
                            x : 100,
                            y: -100
                        }}
                        animate = {{
                            x: 0,
                            y: 0,
                        }}
                        whileTap={{scale:.9}}
                        onClick={(e) => {
                            e.stopPropagation();
                            savePin(_id);
                        }}
                        type='button'
                        className='opacity-70 hover:opacity-100 bg-gradient-to-br
                        from-green-300 to-violet-300
                        hover:from-violet-300 hover:to-green-300
                        text-zinc-950 shadow-xl text-gray-200 rounded-3xl font-extrabold px-5 py-1'>Save</motion.button>
                    )}
                </div>
                <div className='flex justify-between items-center gap-2 w-full'>
                    {destination &&(
                        <motion.a 
                        initial = {{
                            x : -100,
                            y: 100
                        }}
                        animate = {{
                            x: 0,
                            y: 0,
                        }}
                        onClick={(e) => {e.stopPropagation();}}
                        href={destination} 
                        target = '_blank' 
                        rel="noreferrer"
                        className='bg-zinc-900 flex items-center gap-2 text-zinc-200 font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-xl '
                        >   
                        <BsFillArrowUpRightCircleFill />
                            {destination.length > 20 ? destination.slice(8,20) : destination.slice(8)}
                        </motion.a>
                    )}
                    {
                        (postedBy?._id === userInfo[0]?.userID) && (
                            <motion.button 
                        initial = {{
                            x : 100,
                            y: 100
                        }}
                        animate = {{
                            x: 0,
                            y: 0,
                        }}
                        whileTap={{scale:.9}}
                        onClick={(e) => {
                            e.stopPropagation();
                            deletePin(_id);
                        }}
                        type='button'
                        className=' bg-zinc-900 flex items-center gap-2  w-8 h-8 flex items-center justify-center  opacity-75 rounded-full hover:opacity-100 outline-none hover:shadow-xl'>
                            <AiTwotoneDelete color='white' />
                        </motion.button>
                        )}
                </div>
            </div>
        )}  
        </motion.div>
        </motion.div>
                <Link 
                to={`user-profile/${userInfo[0]?.userID}`}
                className='flex gap-2 mt-2 ml-2 items-center'
                >
                    <img
                    className='w-8 h-8 rounded-full object-cover'
                    src={postedBy?.image}
                    alt = 'user-profile'
                    />
                    <p className='text-zinc-300 font-semibold capitalize hover:text-zinc-100'>
                        {postedBy?.userName}
                    </p>
                </Link>
    </motion.div>
)
}

export default Pin;