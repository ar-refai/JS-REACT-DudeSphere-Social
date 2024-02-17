import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { categories } from '../utils/data';
import { client } from '../client';
import Spinner from './Spinner';
import {motion} from 'framer-motion';
import { PiWarningDiamondLight } from "react-icons/pi";

const CreatePin = ({ userInfo }) => {
    const [title, setTitle] = useState('');
    const [about, setAbout] = useState('');
    const [loading, setLoading] = useState(false);
    const [destination, setDestination] = useState();
    const [fields, setFields] = useState();
    const [category, setCategory] = useState();
    const [imageAsset, setImageAsset] = useState();
    const [wrongImageType, setWrongImageType] = useState(false);

    const navigate = useNavigate();

    const uploadImage = (e) => {
        const selectedFile = e.target.files[0];
        // uploading asset to sanity
        if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff') {
            setWrongImageType(false);
            setLoading(true);
            client.assets
                .upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
                .then((document) => {
                    setImageAsset(document);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log('Upload failed:', error.message);
                });
        } else {
            setLoading(false);
            setWrongImageType(true);
        }
    };

    const savePin = () => {
        if (title && about && destination && imageAsset?._id && category) {
            const doc = {
                _type: 'pin',
                title,
                about,
                destination,
                image: {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: imageAsset?._id,
                    },
                },
                userId: userInfo[0].userID,
                postedBy: {
                    _type: 'postedBy',
                    _ref: userInfo[0].userID,
                },
                category,
            };
            client.create(doc).then(() => {
                navigate('/');
            });
        } else {
            setFields(true);

            setTimeout(
                () => {
                    setFields(false);
                },
                2000,
            );
        }
    };
    return (
        <div className="relative sm:my-[200px] lg:my-0 flex flex-col justify-center items-center p-4 h-[calc(100vh-90px)]">
            
            <div className="relative sm:my-[200px] lg:my-0 flex lg:flex-row flex-col justify-center items-center bg-zinc-800 border-dotted border-2 border-zinc-700 lg:p-5 p-3 lg:w-4/5 w-full">
                <div className="bg-zinc-900 p-3 flex flex-0.7 w-full">
                    <div className=" flex justify-center items-center flex-col border-2 border-dotted border-zinc-700 p-3 w-full h-420">
                        {loading && (
                            <Spinner />
                        )}
                        {
                            wrongImageType && (
                                <p>It&apos;s wrong file type.</p>
                            )
                        }
                        {!imageAsset ? (
                            // eslint-disable-next-line jsx-a11y/label-has-associated-control
                            <label>
                                <div className="flex flex-col items-center justify-center h-full">
                                    <div className="flex flex-col justify-center items-center">
                                        <p className="font-bold text-2xl">
                                            <AiOutlineCloudUpload />
                                        </p>
                                        <p className="text-lg">Click to upload</p>
                                    </div>

                                    <p className="mt-32 text-zinc-400">
                                        Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF less than 20MB
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    name="upload-image"
                                    onChange={uploadImage}
                                    className="w-0 h-0"
                                />
                            </label>
                        ) : (
                            <div className="relative h-full ">
                                <img
                                    src={imageAsset?.url}
                                    alt="uploaded-pic"
                                    className="h-full w-full"
                                />
                                <button
                                    type="button"
                                    className="absolute bottom-3 right-3 p-3 rounded-full bg-zinc-800  hover:bg-red-700 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                                    onClick={() => setImageAsset(null)}
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
                    {userInfo && (
                        <div className="flex bg-zinc-700 text-zinc-300 py-3 px-2 gap-2 mt-2 mb-2 items-center rounded-lg ">
                            <Link to={`/user-profile/${userInfo[0]?.userID}`} className='flex justify-center items-center gap-2 '>
                            <img
                                src={userInfo[0].userImage}
                                className="w-10 h-10 rounded-full border-2 border-green-200"
                                alt="user-profile"
                                />
                            <p className="font-bold">{userInfo[0].userName}</p>
                                </Link>
                        </div>
                    )}
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Pin's title"
                        className="outline-none focus:border-zinc-50 text-zinc-100  bg-zinc-800 text-2xl sm:text-lg font-bold border-b-2 border-zinc-500 p-2"
                    />
                    <input
                        type="text"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        placeholder="Pin's description"
                        className="outline-none focus:border-zinc-50 text-zinc-100 bg-zinc-800 text-base sm:text-lg border-b-2 border-zinc-500 p-2"
                    />
                    <input
                        type="url"
                        vlaue={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="Pin's destination link"
                        className="outline-none focus:border-zinc-50 text-zinc-100 bg-zinc-800 text-base sm:text-lg border-b-2 border-zinc-500 p-2"
                    />

                    <div className="flex flex-col">
                        <div>
                            <p className="mb-2 font-semibold text:lg sm:text-xl">Pin's Category</p>
                            <select
                                onChange={(e) => {
                                    setCategory(e.target.value);
                                }}
                                className="outline-none text-zinc-100 bg-zinc-800 w-4/5 text-base border-b-2 border-zinc-500 p-2 focus:border-zinc-50 cursor-pointer"
                            >
                                <option value="others" className="sm:text-bg ">Select Category</option>
                                {categories.map((item) => (
                                    <option className="text-base border-2 outline-none capitalize text-zinc-100 bg-zinc-800 " value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-end items-end mt-5">
                            <motion.button
                                whileTap={{scale:[.9,1,.9,1]}}
                                type="button"
                                onClick={savePin}
                                className="bg-gradient-to-br
                                from-green-300 to-violet-300
                                hover:from-violet-300 hover:to-green-300
                                text-zinc-900 font-bold p-2 rounded-lg w-28 outline-none"
                            >
                                Save Pin
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
            {fields && (
                
                <motion.p
                initial = {{
                    opacity: 0,
                
                }}
                animate = {{
                    opacity:1,
                    
                }}
                exit = {{
                    opacity:0,
                    
                }}
                className="absolute top-[100px] bg-gradient-to-tr from-zinc-800  to-yellow-600 text-zinc-100 mb-5 text-xl transition-all mt-4 px-5 py-2 rounded-lg duration-450 ease-in  flex justify-center items-center">
                    <span>    
                        <PiWarningDiamondLight className='inline flex justify-center items-center mr-2 text-yellow-500' size={30}/>
                    </span>
                    Please fill all fields with valid info.</motion.p>
            )}
        </div>
    );
};

export default CreatePin;