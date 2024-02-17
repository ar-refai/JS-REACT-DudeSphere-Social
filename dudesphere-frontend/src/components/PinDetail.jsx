import React, { useEffect, useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlfor } from '../client';
import MasonryLayout from './MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import Spinner from './Spinner';
import {motion} from 'framer-motion';
const PinDetail = ({ userInfo }) => {
    const { pinId } = useParams();
    const [pins, setPins] = useState();
    const [pinDetail, setPinDetail] = useState();
    const [comment, setComment] = useState('');
    const [addingComment, setAddingComment] = useState(false);

    const fetchPinDetails = () => {
        const query = pinDetailQuery(pinId);

        if (query) {
            client.fetch(`${query}`).then((data) => {
                setPinDetail(data[0]);
                console.log(data);
                if (data[0]) {
                    const query1 = pinDetailMorePinQuery(data[0]);
                    client.fetch(query1).then((res) => {
                        setPins(res);
                    });
                }
            });
        }
    };

    useEffect(() => {
        fetchPinDetails();
    }, [pinId]);

    const addComment = () => {
        if (comment) {
            setAddingComment(true);

            client
                .patch(pinId)
                .setIfMissing({ comments: [] })
                .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: userInfo[0].userID } }])
                .commit()
                .then(() => {
                    fetchPinDetails();
                    setComment('');
                    setAddingComment(false);
                });
        }
    };

    if (!pinDetail) {
        return (
            <Spinner message="Showing pin" />
        );
    }

    return (
        <>
            {pinDetail && (
                <div className="flex xl:flex-row flex-col m-auto bg-zinc-800 w-3/4 mt-5 rounded-lg">
                    <div className="flex justify-center items-center md:items-start flex-initial">
                        <img
                            className="lg:rounded-tl-lg lg:rounded-bl-lg sm:rounded-t-lg"
                            src={(pinDetail?.image && urlfor(pinDetail?.image).url())}
                            alt="user-post"
                        />
                    </div>
                    <div className="w-full p-5 flex-1 xl:min-w-620">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2 items-center">
                                <a
                                    href={`${pinDetail.image.asset.url}?dl=`}
                                    download
                                    className="bg-zinc-200 p-2 text-xl rounded-full flex items-center justify-center text-black opacity-75 hover:opacity-100"
                                >
                                    <MdDownloadForOffline />
                                </a>
                            </div>
                            <a href={pinDetail.destination} target="_blank" rel="noreferrer">
                                {pinDetail.destination?.slice(8)}
                            </a>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold break-words mt-3">
                                {pinDetail.title}
                            </h1>
                            <p className="mt-3">{pinDetail.about}</p>
                        </div>
                        <Link to={`/user-profile/${pinDetail?.postedBy._id}`} className="flex gap-2 mt-5 items-center bg-zinc-700 text-zinc-200 px-2 py-3 text-zinc-300 rounded-lg ">
                            <img src={pinDetail?.postedBy.image} className="w-10 h-10 border-2 border-green-200 rounded-full" alt="user-profile" />
                            <p className="font-bold">{pinDetail?.postedBy.userName}</p>
                        </Link>
                        <h2 className="mt-5 text-2xl">Comments</h2>
                        <div className="max-h-370 overflow-y-auto">
                            {pinDetail?.comments?.map((item) => (
                                <div className="flex gap-2 mt-5 items-center bg-zinc-800 text-zinc-200 rounded-lg" key={item.comment}>
                                    <img
                                        src={item.postedBy?.image}
                                        className="w-10 h-10 rounded-full cursor-pointer"
                                        alt="user-profile"
                                    />
                                    <div className="flex flex-col">
                                        <p className="font-bold">{item.postedBy?.userName}</p>
                                        <p>{item.comment}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-wrap mt-6 gap-3">
                            <Link to={`/user-profile/${userInfo[0].userID}`}>
                                <img src={userInfo[0].userImage} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
                            </Link>
                            <input
                                className=" flex-1 border-zinc-100 outline-none border-2 bg-zinc-800 p-2 rounded-2xl focus:border-zinc-300"
                                type="text"
                                placeholder="Add a comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <motion.button
                                whileTap={{scale:.9}}
                                type="button"
                                className="bg-gradient-to-br
                                from-green-300 to-violet-300
                                hover:from-violet-300 hover:to-green-300
                                text-zinc-900 font-bold p-2 rounded-full w-28 outline-none"
                                onClick={addComment}
                            >
                                {addingComment ? 'Posting...' : 'Post'}
                            </motion.button>
                        </div>
                    </div>
                </div>
            )}
            {pins?.length > 0 && (
                <h2 className="text-center font-bold text-2xl mt-8 mb-4">
                    More like this
                </h2>
            )}
            {pins ? (
                <MasonryLayout pins={pins} />
            ) : (
                <Spinner message="Loading more pins" />
            )}
        </>
    );
};

export default PinDetail;