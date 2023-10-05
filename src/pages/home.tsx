import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreatePostRequest, GetPostsRequest } from "@/redux-saga/action/postAction";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { getCookie } from 'cookies-next';
import PostCard from "@/components/postCard";

export default function PostList() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { posts } = useSelector((state: any) => state.postState);
    const [refresh, setRefresh] = useState(false);
    const [profile, setProfile] = useState(false);
    const isLoggedIn = typeof window !== "undefined" && getCookie('token') || undefined



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
    }, [refresh, dispatch, router, isLoggedIn]);


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
