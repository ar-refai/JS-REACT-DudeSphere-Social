import React from 'react'
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import { jwtDecode } from "jwt-decode";
import DudeVideo from '../assets/share.mp4';
import logo from '../assets/login-logo.png';
import {client} from '../client';

const res = "";
const Login = () => {
    const navigate = useNavigate();
    const responseGoogle = (response) => {
        const credentials = jwtDecode(response.credential);
        // localStorage.setItem('user', JSON.stringify(response));
        // console.log("######################");
        // console.log(response);
        // console.log("######################");
        // console.log(credentials);
        // console.log("######################");
        const {
            name:userName,
            sub : userId,
            picture:userImage
        } = credentials;
        console.log(userId, userName, userImage);
        const userInfo = 
        JSON.stringify([{
            "userID":userId,
            "userName":userName,
            "userImage":userImage
        }]);

        localStorage.setItem('user', userInfo);

        // sub is your id 
        const doc = {
            _id:userId,
            _type:'user',
            userName:userName,
            image:userImage
        }
        client.createIfNotExists(doc)
        .then(() => {
            navigate('/', {replace:true})
        })
    };

        
    return (
        <div className='flex justify-start items-center flex-col h-screen overflow-hidden'>
            <div className='relative w-full h-full overflow-hidden' >
                <video
                    src={DudeVideo}
                    type='video/mp4'
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className='w-full h-full object-cover'
                />
                <div className='absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 w-full h-full bg-blackOverlay overflow-hidden'>
                    <div className='p-4'>
                        <img src={logo} alt="logo" width="230" />
                    </div>
                    <GoogleLogin
                        width="230"
                        onSuccess={responseGoogle}
                        onError={() => {console.log('Login Failed');}}
                    />
                    


                </div>
            </div>
        </div>
    )
}

export default Login

