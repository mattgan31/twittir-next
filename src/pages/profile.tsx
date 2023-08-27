import React, { useEffect, useState } from 'react';
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { GetPostByUserIdRequest } from '@/redux-saga/action/postAction';
import moment from 'moment';

export default function Profile() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { posts } = useSelector((state: any) => state.postState.posts); // Assuming postState is where the posts are stored

    const [username, setUsername] = useState('');

    const isLoggedIn = typeof window !== "undefined" && sessionStorage.getItem('token');
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
            dispatch(GetPostByUserIdRequest(profile.id));
            setUsername(profile.username);
        }
    }, [dispatch, isLoggedIn, profile, router]);


    return (
        <div className="container min-w-2xl max-w-3xl bg-slate-100">
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
                    {posts ? (
                        posts.map((post: any) => (
                            <div
                                onClick={() => router.push(`/posts/${post.id}`)}
                                key={post.id}
                                className="container border-b-2 border-stone-500 item-center justify-center py-4 cursor-pointer"
                            >
                                <div className="px-6 py-1">
                                    <h3 className="text-lg font-medium ">{post.user.username}</h3>
                                </div>
                                <div className="px-3 py-1 rounded-lg mx-6">
                                    <p>{post.post}</p>
                                    <p className="font-light text-sm text-black">
                                        Date: {moment(post.updatedAt).format("DD/MM/YYYY HH:mm")}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-lg font-bold text-center">Loading</div>
                    )}
                </div>
            </div>
        </div>
    );
}
