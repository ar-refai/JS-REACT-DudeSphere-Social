import React from 'react'
import { Link , useNavigate } from 'react-router-dom';
import { IoIosAdd, IoMdAdd , IoMdSearch } from 'react-icons/io';


const Navbar = ({searchTerm , setSearchTerm , userInfo}) => {
    const navigate = useNavigate();
    if(!userInfo) return null;

return (
    <div className='flex gap-2 md:gap-5 w-full mt-5'>
        <div className='flex justify-start items-center w-full rounded-md bg-white border-none outline-none focus-within:shadow-sm'>
            <IoMdSearch fontSize={21} className='ml-1' />
            <input 
                type='text'
                onChange={(e)=> setSearchTerm(e.target.value)}
                placeholder='Search'
                value={ searchTerm }
                onFocus={()=> navigate('/search')}
                className='p-2 w-full bg-white outline-none'
            />
        </div>
        <div className='flex gap-3'>
            <Link to={`user-profile/${userInfo[0]?.userID}`} className='hidden md:block'> 
                <img src={userInfo[0]?.userImage} className='w-11 rounded-lg' alt='user'/>
            </Link>
            <Link to={`create-pin`} className='bg-black text-white rounded-lg w-10 h-10 md:w-12 md:h-10 flex justify-center items-center'> 
                <IoMdAdd />
            </Link>
        </div>
    </div>
)
}

export default Navbar;