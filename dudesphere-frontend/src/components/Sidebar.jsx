import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from "react-icons/io";
import logo from '../assets/page-logo.png';
import { categories } from '../utils/data';
import { motion } from "framer-motion";
import MotionLink from './MotionLink';


const Sidebar = ({ userInfo, closeToggle }) => {
    const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-400 hover:text-gray-200 transition-all duration-200 ease-in-out capitalize hover:ml-2';
    const isActiveStyle = 'flex items-center px-5 gap-3 text-green-500 font-extrabold border-r-2 border-green-500 transition-all duration-200 ease-in-out capitalize hover:ml-2';


    const handleCloseSidebar = () => {
        (closeToggle && closeToggle(false));

    }

    // --------------------------------------------------
    // -----------------Animation------------------------

    // --------------------------------------------------
    // --------------------------------------------------
    return (
        <motion.div
            initial={{
                opacity: 0,
                width: 0,
            }}
            animate={{
                opacity: 1,
                width: "100%"
            }}
            exit={{
                opacity: 0,
                x: "40%",
                transition: { duration: 0.1 }
            }}
            className='flex flex-col justify-between bg-zinc-950 text-gray-400 h-full overflow-y-scroll min-w-210 hide-scrollbar'>
            <div className='flex flex-col'>
                <Link to="/" className='flex px-5 gap-2  my-6 pt-1 w-190 items-center' onClick={handleCloseSidebar}>
                    <img src={logo} alt="logo" className='w-full' />
                </Link>
                <div className="flex text-gray-400 flex-col gap-5">
                    <NavLink to="/" className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle} onClick={handleCloseSidebar}>
                        <MotionLink
                            heading="Home"
                        />
                    </NavLink>
                    {
                        categories.slice(0, categories.length - 1).map((categ) => {
                            return (
                                <NavLink
                                    to={`/category/${categ.name}`}
                                    className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                                    onClick={handleCloseSidebar}
                                    key={categ.name}

                                >
                                    <img 
                                        src={categ.image} 
                                        alt={categ.name} 
                                        className='rounded-full md:hidden w-9 h-9 '
                                        />
                
                                    <MotionLink
                                        heading={categ.name}
                                        imgSrc={categ.image}
                                    />
                                </NavLink>
                            )
                        })
                    }
                    <Link
                        to={`user-profile/${userInfo[0]?.userID}`}
                        className='flex mt-1 mb-3 gap-2 p-2 items-center rounded-lg mx-3 hover:text-gray-200 '
                        onClick={handleCloseSidebar}
                    >
                        <img src={userInfo[0]?.userImage} className="w-9 h-9 rounded-full " alt="user-profile" />
                        <p>{userInfo[0]?.userName}</p>
                        <IoIosArrowForward />
                    </Link>

                </div>
            </div>

        </motion.div>
    )
}

export default Sidebar