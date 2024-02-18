import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { GoogleLogout } from 'react-google-login';
import SpotLight from "./Spotlight.tsx";
import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { motion } from 'framer-motion';
import { IoIosLogOut } from "react-icons/io";

const activeBtnStyles = 'bg-gradient-to-br from-violet-300 to-green-300 w-32 text-zinc-950 font-bold p-2 rounded-full w-20 outline-none border-2 border-transparent hover:border-2 hover:border-zinc-200 transition-all duration-200 ease-in-out';
const notActiveBtnStyles = ' text-zinc-200 font-bold p-2 w-32 rounded-full w-20 outline-none  border-2 border-transparent hover:border-2 hover:border-zinc-200 transition-all duration-200 ease';

const UserProfile = () => {
    const [user, setUser] = useState();
    const [pins, setPins] = useState();
    const [text, setText] = useState('Created');
    const [activeBtn, setActiveBtn] = useState('created');
    const navigate = useNavigate();
    const { userID } = useParams();

    const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

    useEffect(() => {
        const query = userQuery(userInfo[0]?.userID);
        client.fetch(query).then((data) => {
            setUser(data[0]);
        });
    }, [userID]);

    useEffect(() => {
        if (text === 'Created') {
            const createdPinsQuery = userCreatedPinsQuery(userID);

            client.fetch(createdPinsQuery).then((data) => {
                setPins(data);
            });
        } else {
            const savedPinsQuery = userSavedPinsQuery(userID);

            client.fetch(savedPinsQuery).then((data) => {
                setPins(data);
            });
        }
    }, [text, userID]);

    const handleLogout = () => {
        setUser({});
        localStorage.clear();
        navigate('/login');
    };

    if (!userInfo) return <Spinner message="Loading profile" />;

    return (
        <>
            <div className="relative pb-2 h-full justify-center items-center">
                <div className="flex flex-col pb-5">
                    <div className="relative flex flex-col mb-7">

                        <div className="flex flex-col justify-center items-center">
                            <div className="h-[35rem] w-full flex md:items-center md:justify-center bg-zinc-950 antialiased bg-grid-white/[0.02] relative overflow-hidden">
                            <h2 className="flex flex-col justify-center items-center text-4xl md:text-7xl font-bold text-center mx-auto bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                            <span className='text-green-500'>    
                            DudeSphere 
                            </span>
                            is the new trend.
                            </h2>
                                <SpotLight
                                    className="-top-40 left-0 md:left-60 md:-top-20"
                                    fill="white"
                                />
                            </div>
                            <img
                                className="rounded-full w-20 h-20 z-10 -mt-10 shadow-xl object-cover"
                                src={userInfo[0]?.userImage}
                                alt="user-pic"
                            />
                        </div>
                        <h1 className="font-bold text-3xl text-center mt-3">
                            {userInfo[0]?.userName}
                        </h1>

                        {
                            Object.keys(userInfo).length != 0 &&(
                                <motion.button
                                whileHover={{
                                    scale: 1.06
                                }}
                                whileTap={{
                                    scale: .9
                                }}
                                type="button"
                                className="flex justify-center items-center absolute right-[30px] top-[10px] bg-gradient-to-tr from-red-500 to-green-300 text-zinc-950 mx-auto font-extrabold hover:from-green-300 hover:to-red-800 transition-all duration-300 ease w-12 h-12 hover:text-white px-2  rounded-full cursor-pointer mt-5 outline-none shadow-md"
                                onClick={handleLogout}
                                onHoverStart={(e) => {
                                    e.target.querySelector('span').classList.remove('hidden');
                                    e.target.classList.add('w-28')

                                }}
                                onHoverEnd={(e) => {
                                    e.target.querySelector('span').classList.add('hidden');
                                    e.target.classList.remove('w-28')
                                }}
                                >
                                    <span className='hidden mr-2'>
                                    Logout
                                    </span>
                                    <IoIosLogOut size={20}/>
                                </motion.button>
                            
                        )}
                        
                    </div>
                    <div className="text-center mb-7 flex gap-2 justify-center">
                        <button
                            type="button"
                            onClick={(e) => {
                                setText(e.target.textContent);
                                setActiveBtn('created');
                            }}
                            className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
                        >
                            Created
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                setText(e.target.textContent);
                                setActiveBtn('saved');
                            }}
                            className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
                        >
                            Saved
                        </button>
                    </div>

                    <div className="px-2">
                        <MasonryLayout pins={pins} />
                    </div>

                    {pins?.length === 0 && (
                        <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
                            No Pins Found!
                        </div>
                    )}
                </div>

            </div>
        </>
    );
};

export default UserProfile;