import React, { useEffect, useState } from 'react';
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { GetPostByUserIdRequest } from '@/redux-saga/action/postAction';
import moment from 'moment';
import { CreateLikePostRequest } from '@/redux-saga/action/likeAction';
import * as Outline from "@heroicons/react/24/outline"

export default function Profile() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { userPosts } = useSelector((state: any) => state.postState); // Assuming postState is where the posts are stored
    const [refresh, setRefresh] = useState(false);
    const [username, setUsername] = useState('');

    let isLoggedIn = typeof window !== "undefined" && sessionStorage.getItem('token');
    const profile = typeof window !== "undefined" && JSON.parse(sessionStorage.getItem('profile') || '{}');

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("profile");
        router.push("/login");
    };

    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/login");
        }

        // Dispatch GetPostByUserIdRequest action with the user ID from the profile
        if (profile) {
            setUsername(profile.username);
            dispatch(GetPostByUserIdRequest(profile.id));
        }

        setRefresh(false);
    }, [dispatch, isLoggedIn, router, refresh]);


    const handleLike = (id: number): void => {
        dispatch(CreateLikePostRequest({ id }))
        setRefresh(true)
    };

    return (
        <div className="container min-w-2xl max-w-3xl bg-slate-100 mb-20">
            <div className="flex p-6 border-b-2 border-stone-500">
                <button className="me-8" onClick={() => router.back()}>
                    <ArrowLeftIcon className="h-8 w-8" />
                </button>
                <h1 className="text-2xl font-medium">Post</h1>
            </div>
            <div className="container border-b-2 border-stone-500 item-center justify-center py-4">
                <div className="px-6 py-1 flex justify-between">
                    <h3 className="text-xl font-bold">{username}</h3>
                    <button
                        onClick={handleLogout}
                        className='bg-red-500 px-6 py-2 font-medium text-xl rounded-md text-white'
                    >
                        Logout
                    </button>
                </div>
                <div className="px-6 py-1">
                    {userPosts ? (
                        userPosts.posts.map((post: any) => (
                            <div
                                key={post.id}
                                className="container border-b-2 border-stone-500 item-center justify-center py-4"
                            >
                                <div className="px-6 py-1">
                                    <h3 className="text-lg font-medium cursor-pointer">{post.user.username}</h3>
                                </div>
                                <div className="px-3 py-1 my-3 mx-6 cursor-pointer border-b-2 border-stone-500 " onClick={() => router.push(`/posts/${post.id}`)}>
                                    <p>{post.post}</p>
                                    <p className="font-light text-sm text-black">
                                        Date: {moment(post.createdAt).format("DD/MM/YYYY HH:mm")}
                                    </p>
                                </div>
                                <div className="flex justify-center px-3 py-1 rounded-lg mx-6 cursor-pointer">
                                    <div className="w-1/2 text-center flex justify-center" onClick={() => handleLike(post.id)}><Outline.HeartIcon className={`h-8 w-8 ${post.likes.some((like: any) => like.user.id === profile.id) ? 'fill-red-600' : ''}`} /><p className="py-1 px-2">{post.likes.length > 0 ? post.likes.length : '0'}</p></div>
                                    <div className="w-1/2 text-center flex justify-center"><Outline.ChatBubbleLeftIcon className="h-8 w-8" /><p className="py-1 px-2">{post.comments.length > 0 ? post.comments.length : '0'}</p></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>
                            <p className="text-lg font-bold text-center">Loading</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
