import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { CreatePostRequest, GetPostsRequest } from "@/redux-saga/action/postAction";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Solid from "@heroicons/react/24/solid"
import * as Outline from "@heroicons/react/24/outline"
import { CreateLikePostRequest } from "@/redux-saga/action/likeAction";

export default function PostList() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { posts } = useSelector((state: any) => state.postState.posts);
    const [refresh, setRefresh] = useState(false);


    const isLoggedIn = typeof window !== "undefined" && sessionStorage.getItem('token') || undefined

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
                // Refresh the data.
                dispatch(GetPostsRequest());
                // Clear the refresh flag.
                setRefresh(false);
            }, 100);
        }
    }, [refresh, dispatch, router, isLoggedIn]);

    const profile = typeof window !== "undefined" && JSON.parse(sessionStorage.getItem('profile') || '{}');


    return (
        <div className="container min-w-2xl max-w-3xl bg-slate-100 mb-20">
            <div className="p-6 border-b-2 border-stone-500">
                <h1 className="text-2xl font-medium">Home</h1>
            </div>
            <div className="p-6 border-b-2 border-stone-500">
                <form onSubmit={formik.handleSubmit}>
                    <label className="text-gray-700">Create a Post</label>
                    <input
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.post}
                        name="post"
                        id="post"
                        placeholder="What do you think ?"
                        className="rounded-md border-0 my-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 block w-full p-2"
                    />
                    <button
                        type="submit"
                        className="flex w-full my-2 justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Post
                    </button>
                </form>
            </div>
            {posts ? (
                posts.map((post: any) => (
                    <div
                        key={post.id}
                        className="container border-b-2 border-stone-500 item-center justify-center py-4"
                    >
                        <div className="px-6 py-1">
                            <h3 className="text-lg font-medium cursor-pointer">{post.user.username}</h3>
                        </div>
                        <div className="px-3 py-1 rounded-lg mx-6 cursor-pointer" onClick={() => router.push(`/posts/${post.id}`)}>
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
    );
}
