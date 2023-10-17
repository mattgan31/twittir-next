import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { GetPostByUserIdRequest } from '@/redux-saga/action/postAction';
import { deleteCookie, getCookie } from 'cookies-next';
import Image from 'next/image'
import PostCard from '@/components/postCard';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { authMiddleware } from '../protected-page';

export const getServerSideProps = authMiddleware;

export default function Profile() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { userPosts } = useSelector((state: any) => state.postState);
    const [refresh, setRefresh] = useState(false);
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

    const isLoggedIn = typeof window !== "undefined" && getCookie('token');
    const profile = typeof window !== "undefined" && JSON.parse(getCookie('profile') || '{}');

    const handleLogout = () => {
        deleteCookie("token");
        deleteCookie("profile");
        router.push("/login");
    };

    useEffect(() => {

        setUsername(profile.username);
        setFullname(profile.fullname);
        setProfilePicture(profile.profilePicture)

        setTimeout(() => {

            // Refresh the data.
            dispatch(GetPostByUserIdRequest(profile.id));
            // Clear the refresh flag.
            setRefresh(false);
        }, 100);

        setRefresh(false);
    }, [dispatch, isLoggedIn, router, refresh, profile.username, profile.profilePicture, profile.id]);


    // const handleLike = (id: number): void => {
    //     dispatch(CreateLikePostRequest({ id }))
    //     setRefresh(true)
    // };

    return (
        <div className="container min-w-2xl max-w-screen-lg lg:w-2/4 mt-6 mb-20">
            <div className="bg-white mb-6 drop-shadow-md rounded-lg">
                <div className="flex p-6 border-b-2 border-gray-100">
                    <h1 className="text-2xl font-medium">Profile</h1>
                </div>
                <div className="p-6 flex justify-between">
                    <div className='flex flex-row items-center'>
                        {profilePicture ? (<Image src={`http://localhost:3001/public/uploads/${profilePicture}`} alt={username} width={80} height={80} className='w-12 h-12 mr-2 rounded-full' />) : <UserCircleIcon className='w-12 h-12 mr-2 fill-gray-400' />}
                        <div className='flex flex-col'>
                            <h3 className="text-xl font-bold mr-1">{fullname}</h3>
                            <p className='text-lg text-slate-700'>@{username}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className='bg-red-500 px-6 pb-2 pt-1 font-medium text-xl rounded-md text-white'
                    >
                        Logout
                    </button>
                </div>
            </div>
            <div className="">
                {userPosts ? (
                    userPosts.map((post: any) => (
                        <PostCard key={post.id} post={post} setRefresh={setRefresh} />
                    ))
                ) : (
                    <div>
                        <p className="text-lg font-bold text-center">Loading</p>
                    </div>
                )}
            </div>
        </div>
    );
}
