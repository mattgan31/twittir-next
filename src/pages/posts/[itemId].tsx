import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { GetPostByIdRequest } from '../../redux-saga/action/postAction';
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import { useFormik } from 'formik';
import { CreateCommentRequest } from '../../redux-saga/action/commentAction';
import { useRouter } from 'next/router';
import { CreateLikeCommentRequest, CreateLikePostRequest } from '@/redux-saga/action/likeAction';
import * as Outline from "@heroicons/react/24/outline"
import { getCookie } from 'cookies-next';

export default function PostDetail() {
    const router = useRouter();
    const [refresh, setRefresh] = useState(false);
    const { itemId } = router.query;
    const dispatch = useDispatch();
    const { selectedPost } = useSelector((state: any) => state.postState);

    const formik = useFormik({
        initialValues: {
            description: ''
        },
        onSubmit: async (values, { resetForm }) => {
            const payload = {
                description: values.description
            }
            dispatch(CreateCommentRequest({ id: itemId, payload }));
            window.alert("Reply successfully created");
            setRefresh(true)
            resetForm();
        }
    })

    const isLoggedIn = typeof window !== "undefined" && getCookie('token');

    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/login");
        } else {
            setTimeout(() => {

                // Refresh the data.
                dispatch(GetPostByIdRequest(itemId));
                // Clear the refresh flag.
                setRefresh(false);
            }, 100);

            setRefresh(false);
        }
    }, [dispatch, itemId, refresh]);

    const handleLike = (id: number): void => {
        dispatch(CreateLikePostRequest({ id }))
        setRefresh(true)
    };
    const handleLikeComment = (id: number): void => {
        dispatch(CreateLikeCommentRequest({ id }))
        setRefresh(true)
    };

    if (!itemId || !selectedPost) {
        return <div>Loading...</div>;
    }

    // Destructure the selectedPost to avoid unnecessary repetition
    const { id, user, post, createdAt, comments, likes } = selectedPost.posts;

    const profile = typeof window !== "undefined" && JSON.parse(getCookie('profile') || '{}');

    const userLikedPosts = likes.filter((like: any) => like.user.id === profile.id);

    return (
        <div className="container min-w-2xl max-w-3xl mt-6 mb-20">
            <div className='bg-white mb-6 drop-shadow-md rounded-lg'>
                <div className="flex p-6 p-6 border-gray-100 border-b-2">

                    <button className="me-8" onClick={() => router.back()}>
                        <ArrowLeftIcon className='h-8 w-8' />
                    </button>
                    <h1 className="text-2xl font-medium">Post</h1>
                </div>
                <div className="container item-center justify-center py-4">
                    <div className="px-6 py-1">
                        <h3 className="text-xl font-bold ">{user.username}</h3>
                    </div>
                    <div className="px-3 py-1  mx-6">
                        <p>{post}</p>
                        <p className="font-light text-sm text-black">
                            Date: {moment(createdAt).format('DD/MM/YYYY HH:mm')}
                        </p>
                    </div>
                </div>
                <div className="flex justify-center px-3 py-3 rounded-lg my-3 mx-6 cursor-pointer border-gray-100 border-b-2 border-t-2">
                    <div className="w-1/2 text-center flex justify-center" onClick={() => handleLike(id)}> <Outline.HeartIcon className={`h-8 w-8 ${userLikedPosts.length > 0 ? 'fill-red-600' : ''}`} /> <p className="py-1 px-2">{likes.length > 0 ? likes.length : '0'}</p></div>
                    <div className="w-1/2 text-center flex justify-center"><Outline.ChatBubbleLeftIcon className="h-8 w-8" /><p className="py-1 px-2">{comments.length > 0 ? comments.length : '0'}</p></div>
                </div>
                <div className=''>
                    <form className='px-6 pb-3 flex'
                        onSubmit={formik.handleSubmit}>
                        <input type='text' className='flex-1 me-2 rounded-md my-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 block p-2'
                            placeholder='Type your reply now!'
                            value={formik.values.description}
                            id='description'
                            name='description'
                            onChange={formik.handleChange}
                        />
                        <button className='flex my-2 justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                            type='submit'
                        >Reply</button>
                    </form>
                </div>
            </div>
            <div className='bg-white mb-6 drop-shadow-md rounded-lg'>
                {comments ? (
                    comments.map((comment: any) => (
                        <div key={comment.id} className='container item-center justify-center py-4'>
                            <div className="px-6 py-1">
                                <h3 className='text-lg font-semibold'>{comment.user.username}</h3>
                            </div>
                            <div className="px-6 pb-6 pt-2 mx-6">
                                <p>{comment.description}</p>
                                <p className='font-light text-sm text-black'>Date: {moment(comment.updatedAt).format('DD/MM/YYYY HH:mm')}</p>
                            </div>
                            <div className="flex justify-center px-3 pt-4 rounded-lg mx-6 cursor-pointer border-gray-100 border-t-2">
                                <div className="w-1/2 text-center flex justify-center" onClick={() => handleLikeComment(comment.id)}><Outline.HeartIcon className={`h-8 w-8 ${comment.likes && comment.likes.some((like: any) => like.user.id === profile.id) ? 'fill-red-600' : ''}`} /><p className="py-1 px-2">{comment.likes ? comment.likes.length : '0'}</p></div>
                            </div>
                        </div>
                    ))
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
