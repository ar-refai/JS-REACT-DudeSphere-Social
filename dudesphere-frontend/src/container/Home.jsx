import React, { useState, useRef, useEffect } from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import Pins from './Pins';
import { Sidebar, UserProfile } from '../components';
// icons from react icons
import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai';
// backend stuff
import { client } from '../client';
import { userQuery } from "../utils/data"
// logo
import logo from '../assets/page-logo.png';
import { fetchUser } from '../utils/fetchUser';
import { motion } from 'framer-motion';
function Home() {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [user, setUser] = useState();
    const scrollRef = useRef(null);

    const userInfo = fetchUser();
    console.log(userInfo);
    useEffect(() => {
        const query = userQuery(userInfo?.userID);
        console.log(userInfo);
        client.fetch(query).then((data) => {
            setUser(data[0]);
        });
    }, []);

    useEffect(() => {
        scrollRef.current.scrollTo(0, 0);
    });
    return (
        <>
            <div className='flex bg-zinc-900 text-gray-400 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
                {/* Sidebar on medium devices and above.. */}
                <div className='hidden md:flex h-screen flex-initial'>
                    <Sidebar userInfo={userInfo} />
                </div>

                {/* Sidebar on smaller devices with 3-cols.. */}
                <div className="flex md:hidden flex-row">

                    {/* col-1 */}

                    <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
                        <HiMenu fontSize={40} className='cursor-pointer' onClick={() => { setToggleSidebar(true) }} />
                        {/* logo */}
                        <Link to="/">
                            <img src={logo} alt="logo" className='w-36' />
                        </Link>
                        {/* user link && image */}
                        <Link to={`user-profile/${userInfo[0]?.userID}`}>
                            <img src={userInfo[0]?.userImage} alt="logo" className='w-12 rounded-full' />
                        </Link>
                    </div>

                    {/* col-2 */}

                    {/* hamburger icon */}
                    {toggleSidebar && (
                        // desktop sidebar
                        
                            <motion.div
                            
                            className='fixed w-4/5 bg-zinc-900 h-screen overflow-y-auto shadown-md z-20 animate-slide-in'>
                                <div className='absolute w-full flex justify-end items-center p-2 mt-5'>
                                    <AiFillCloseCircle fontSize={30} className='cursor-pointer' color='gray' onClick={() => setToggleSidebar(false)} />
                                </div>
                                <Sidebar userInfo={userInfo} closeToggle={setToggleSidebar} />
                            </motion.div>
                    )}
                </div>

                {/* col-3 */}

                <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
                    <Routes>
                        <Route path="/user-profile/:userID" element={<UserProfile />} />
                        <Route path="/*" element={<Pins userInfo={(userInfo && userInfo)} />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default Home