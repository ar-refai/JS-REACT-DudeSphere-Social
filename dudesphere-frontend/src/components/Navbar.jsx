import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import {motion} from "framer-motion";

const Navbar = ({ searchTerm, setSearchTerm, userInfo }) => {
    const navigate = useNavigate();
    if (!userInfo) return null;

    return (
        <div className='flex gap-2 bg-zinc-900 md:gap-5 w-full mt-5 px-2'>
            <div className="flex justify-start items-center w-full px-2 rounded-md bg-zinc-800 border-none outline-none focus-within:shadow-sm bg-gray-200 text-zinc-200">
                <IoMdSearch fontSize={21} className="ml-1 " />
                <input
                    type="text"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search"
                    value={searchTerm}
                    onFocus={() => navigate('/search')}
                    className="p-2 w-full bg-zinc-800 outline-none"
                />
            </div>
            <div className='flex bg-zinc-900 gap-3 justify-center items-center'>
                <Link to={`user-profile/${userInfo[0]?.userID}`} className='hidden md:block active:scale-[.9]'>
                    <img src={userInfo[0]?.userImage} className='w-9 h-8 md:w-11 md:h-10 flex border-2 border-green-300 rounded-full' alt='user' />
                </Link>
                <Link to={`create-pin`} className='bg-gradient-to-br
                                from-green-300 to-violet-300
                                hover:from-violet-300 hover:to-green-300
                                text-zinc-900 rounded-full w-11 h-10 md:w-12 md:h-10 flex justify-center items-center hover:from-violet-300 hover:to-green-300 active:scale-[.9]'>
                    
                    <IoMdAdd />
                </Link>
            </div>
        </div>
    )
}

export default Navbar;