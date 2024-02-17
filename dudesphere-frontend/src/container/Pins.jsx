import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, Feed, PinDetail, CreatePin, Search } from '../components';
import { AnimatePresence, motion } from 'framer-motion';

const Pins = ({ userInfo }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();  // for transition between pages read more about it
    return (
        <div className=' px-2 md:px-5 '>
            <div className='bg-gray-50'>
                <Navbar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    userInfo={userInfo}
                />
            </div>
            <div className='h-full'>
                <AnimatePresence>
                    <Routes location={location} key={location.pathname}>
                        <Route
                            path="/"
                            element={<Feed />}
                        />
                        <Route
                            path="/category/:categoryId"
                            element={<Feed />}
                        />
                        <Route
                            path="/pin-detail/:pinId"
                            element={<PinDetail userInfo={userInfo} />}
                        />
                        <Route
                            path="/create-pin/"
                            element={<CreatePin userInfo={userInfo} />}
                        />
                        <Route
                            path="/search"
                            element={
                                <Search
                                    searchTerm={searchTerm}
                                    setSearchTerm={setSearchTerm}
                                />}
                        />

                    </Routes>
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Pins