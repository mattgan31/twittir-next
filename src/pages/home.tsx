import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { CreatePostRequest, GetPostsRequest } from "@/redux-saga/action/postAction";
import { useFormik } from "formik";
import { useRouter } from "next/router";


export default function PostList() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { posts } = useSelector((state: any) => state.postState.posts);
    const [refresh, setRefresh] = useState(false);


    let isLoggedIn = typeof window !== "undefined" && sessionStorage.getItem('token') || undefined


    const formik = useFormik({
        initialValues: {
            post: "",
        },
        onSubmit: async (values) => {
            let payload = {
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
        }
        dispatch(GetPostsRequest());
    }, [refresh, dispatch, router, isLoggedIn]);

    return (
        <div className="container min-w-2xl max-w-3xl bg-slate-100 mb-20">
            <div className="p-6 border-b-2 border-gray-600">
                <h1 className="text-2xl font-medium">Home</h1>
            </div>
            <div className="p-6 border-b-2 border-gray-600">
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
                        onClick={() => router.push(`/posts/${post.id}`)}
                        key={post.id}
                        className="container border-b-2 border-gray-600 item-center justify-center py-4 cursor-pointer"
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
                <div>
                    <p className="text-lg font-bold text-center">Loading</p>
                </div>
            )}
        </div>
    );
}
