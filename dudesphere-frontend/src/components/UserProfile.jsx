import React, { useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
// import { GoogleLogout } from 'react-google-login';
import cn from "../utils/cn.ts";
import SpotLight from "./Spotlight.tsx";
import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import logo from '../assets/page-logo.png'
const activeBtnStyles = 'bg-green-600 text-zinc-200 font-bold p-2 rounded-full w-20 outline-none border-2 border-transparent hover:border-2 hover:border-zinc-200 transition-all duration-200 ease-in-out';
const notActiveBtnStyles = 'bg-primary text-zinc-200 font-bold p-2 rounded-full w-20 outline-none  border-2 border-transparent hover:border-2 hover:border-zinc-200 transition-all duration-200 ease';

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

    const logout = () => {
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
                            <div className="h-[30rem] w-full flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
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
                                className="rounded-full w-20 h-20 z-50 -mt-10 shadow-xl object-cover"
                                src={userInfo[0]?.userImage}
                                alt="user-pic"
                            />
                        </div>
                        <h1 className="font-bold text-3xl text-center mt-3">
                            {userInfo[0]?.userName}
                        </h1>
                        {/* <div className="absolute top-0 z-1 right-0 p-2">
                        {userID === User[0].userID && (
                            <GoogleLogout
                                clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                                render={(renderProps) => (
                                    <button
                                        type="button"
                                        className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                    >
                                        <AiOutlineLogout color="red" fontSize={21} />
                                    </button>
                                )}
                                onLogoutSuccess={logout}
                                cookiePolicy="single_host_origin"
                            />
                            )}
                    </div> */}
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