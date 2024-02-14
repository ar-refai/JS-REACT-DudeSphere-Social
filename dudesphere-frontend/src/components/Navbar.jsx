import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoIosAdd, IoMdAdd, IoMdSearch } from 'react-icons/io';


const Navbar = ({ searchTerm, setSearchTerm, userInfo }) => {
    const navigate = useNavigate();
    if (!userInfo) return null;

    return (
        <div className='flex gap-2 bg-zinc-900 md:gap-5 w-full mt-5 px-2'>
            <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm bg-gray-200 text-zinc-950">
                <IoMdSearch fontSize={21} className="ml-1 " />
                <input
                    type="text"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search"
                    value={searchTerm}
                    onFocus={() => navigate('/search')}
                    className="p-2 w-full bg-gray-200 outline-none"
                />
            </div>
            <div className='flex bg-zinc-900 gap-3 justify-center items-center'>
                <Link to={`user-profile/${userInfo[0]?.userID}`} className='hidden md:block active:scale-[.9]'>
                    <img src={userInfo[0]?.userImage} className='w-11 h-9 flex  rounded-lg' alt='user' />
                </Link>
                <Link to={`create-pin`} className='bg-gradient-to-br from-green-900 to-zinc-900 border border-green-950 text-gray-200 rounded-lg w-11 h-10 md:w-12 md:h-10 flex justify-center items-center hover:from-zinc-900 hover:to-green-900 active:scale-[.9]'>
                    
                    <IoMdAdd />
                </Link>
            </div>
        </div>
    )
}

export default Navbar;