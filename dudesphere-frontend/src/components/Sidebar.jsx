import React from 'react'
import { NavLink , Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from "react-icons/io";
import logo from '../assets/page-logo.png';
import { categories } from '../utils/data';

const Sidebar = ({userInfo , closeToggle}) => {
    const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-400 hover:text-gray-200 transition-all duration-200 ease-in-out capitalize';

    const isActiveStyle = 'flex items-center px-5 gap-3 text-green-500 font-extrabold border-r-2 border-green-500 transition-all duration-200 ease-in-out capitalize';



    const handleCloseSidebar = () => {
        (closeToggle && closeToggle(false));

    }
return (
<div className='flex flex-col justify-between bg-zinc-950 text-gray-400 h-full overfolw-y-scroll min-w-210 hide-scrollbar'>
    <div className='flex flex-col'>
    <Link to="/" className='flex px-5 gap-2  my-6 pt-1 w-190 items-center' onClick={handleCloseSidebar}>
        <img src={logo} alt="logo" className='w-full'/>
    </Link>
    <div className="flex text-gray-400 flex-col gap-5">
        <NavLink to="/" className={({isActive})=> isActive ?  isActiveStyle : isNotActiveStyle } onClick={handleCloseSidebar}>
            <RiHomeFill /> Home
        </NavLink>
        <h3 className='mt-1 px-5 text-base 2xl:text-lg'>Descover Categories</h3>
        {
        categories.slice(0 , categories.length - 1).map((categ) => {
            return <NavLink to={`/category/${categ.name}`} className={({isActive})=> isActive ?  isActiveStyle : isNotActiveStyle } onClick={handleCloseSidebar} key={categ.name}>
                <img src={categ.image} alt={categ.name} className='rounded-full w-9 h-9' />
                {categ.name}
            </NavLink>
        }) 
        }
        <Link 
        to={`user-profile/${userInfo[0]?.userID}`}
        className='flex mt-10 mb-3 gap-2 p-2 items-center rounded-lg mx-3'
        onClick={handleCloseSidebar}
        >
        <img src={userInfo[0]?.userImage} className="w-9 h-9 rounded-full hover:text-gray-200" alt="user-profile"/>
        <p>{userInfo[0]?.userName}</p>
        <IoIosArrowForward />
        </Link>
        
    </div>
    </div>

</div>
)
}

export default Sidebar