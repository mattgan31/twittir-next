import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { CreatePostRequest, GetPostsRequest } from "@/redux-saga/action/postAction";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Outline from "@heroicons/react/24/outline"
import { CreateLikePostRequest } from "@/redux-saga/action/likeAction";
import { getCookie } from 'cookies-next';
import Image from "next/image";

export default function PostList() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { posts } = useSelector((state: any) => state.postState.posts);
    const [refresh, setRefresh] = useState(false);
    const [profile, setProfile] = useState({ id: null });

    const isLoggedIn = typeof window !== "undefined" && getCookie('token') || undefined

    const handleLike = (id: number): void => {
        dispatch(CreateLikePostRequest({ id }))
        setRefresh(true)
    };

    const formik = useFormik({
        initialValues: {
            post: "",
        },
        onSubmit: async (values) => {
            const payload = {
                post: values.post,
            };
            dispatch(CreatePostRequest(payload));
            window.alert("Successfully posted");
            setRefresh(true);
            formik.resetForm({
                values: {
                    post: "",
                },
            });
        },
    });

    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/login");
        } else {
            setTimeout(() => {
                const cookiesString = getCookie('profile') as string;
                if (cookiesString) {
                    const cookiesObject = JSON.parse(cookiesString);
                    setProfile(cookiesObject);
                } else {
                    console.error('Cookies string is undefined');
                }
                // Refresh the data.
                dispatch(GetPostsRequest());
                // Clear the refresh flag.
                setRefresh(false);
            }, 100);
        }
    }, [refresh, dispatch, router, isLoggedIn, setRefresh]);


    return (
        <div className="container min-w-2xl max-w-screen-lg lg:w-2/4 mt-6 mb-20">
            <div className="bg-white mb-6 drop-shadow-md rounded-lg">
                <div className="p-6 border-stone-500">
                    <form onSubmit={formik.handleSubmit}>
                        <label className="text-gray-700">Create a Post</label>
                        <textarea
                            onChange={formik.handleChange}
                            value={formik.values.post}
                            name="post"
                            id="post"
                            placeholder="What do you think ?"
                            className="rounded-md border-0 my-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-0 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 block w-full p-2"
                        ></textarea>
                        <button
                            type="submit"
                            className="flex w-full my-2 justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Post
                        </button>
                    </form>
                </div>
            </div>
            <div>
                {posts ? (
                    posts.map((post: any) => (
                        <div
                            key={post.id}
                            className="container item-center justify-center py-4 drop-shadow-md bg-white mb-6 rounded-lg min-w-2xl max-w-screen-lg w-full"
                        >
                            <div className="px-6 py-1 flex flex-row items-center">
                                {post.user.profile_picture ? (<Image src={`http://localhost:3001/public/uploads/${post.user.profile_picture}`} alt={post.user.username} width={80} height={80} className='w-10 h-10 mr-2 rounded-full' />) : <Outline.UserCircleIcon className='w-10 h-10 mr-2 fill-gray-100 stroke-gray-400' />}
                                <h3 className="text-lg font-medium cursor-pointer">{post.user.username}</h3>
                            </div>
                            <div className="px-3 pt-1 pb-4  mx-6 cursor-pointer border-b-2" onClick={() => router.push(`/posts/${post.id}`)}>
                                <p className="mb-3 text-base">{post.post}</p>
                                <p className="font-light text-sm text-black">
                                    Date: {moment(post.createdAt).format("DD/MM/YYYY HH:mm")}
                                </p>
                            </div>
                            <div className="flex justify-center px-3 py-1 rounded-lg mt-3 mx-6 cursor-pointer">
                                <div className="w-1/2 text-center flex justify-center" onClick={() => handleLike(post.id)}>
                                    <Outline.HeartIcon className={`h-8 w-8 ${post.likes.some((like: any) => like.user.id === profile.id) ? 'fill-red-600' : ''}`} /><p className="py-1 px-2">{post.likes.length > 0 ? post.likes.length : '0'}</p></div>
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
    );
}
