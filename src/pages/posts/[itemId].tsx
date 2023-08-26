import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { GetPostByIdRequest } from '../../redux-saga/action/postAction';
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import { useFormik } from 'formik';
import { CreateCommentRequest } from '../../redux-saga/action/commentAction';
import { useRouter } from 'next/router';

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
            let payload = {
                description: values.description
            }
            dispatch(CreateCommentRequest({ id: itemId, payload }));
            window.alert("Reply successfully created");
            setRefresh(true)
            resetForm();
        }
    })

    useEffect(() => {
        if (itemId) {
            dispatch(GetPostByIdRequest(itemId));
        }
    }, [dispatch, itemId, refresh]);

    if (!itemId || !selectedPost) {
        return <div>Loading...</div>;
    }

    // Destructure the selectedPost to avoid unnecessary repetition
    const { user, post, updatedAt, comments } = selectedPost.posts;

    return (
        <div className="container min-w-2xl max-w-3xl bg-slate-100">
            <div className="flex p-6 p-6 border-b-2 border-gray-600">

                <button className="me-8" onClick={() => router.back()}>
                    <ArrowLeftIcon className='h-8 w-8' />
                </button>
                <h1 className="text-2xl font-medium">Post</h1>
            </div>
            <div className="container border-b-2 border-gray-600 item-center justify-center py-4">
                <div className="px-6 py-1">
                    <h3 className="text-xl font-bold ">{user.username}</h3>
                </div>
                <div className="px-3 py-1  mx-6">
                    <p>{post}</p>
                    <p className="font-light text-sm text-black">
                        Date: {moment(updatedAt).format('DD/MM/YYYY HH:mm')}
                    </p>
                </div>
            </div>
            <div className='border-gray-500 border-b-2'>
                <form className='p-6 flex'
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
            <div className=''>
                {comments ? (
                    comments.map((comment: any) => (
                        <div key={comment.id} className='container border-b-2 border-gray-600 item-center justify-center py-4'>
                            <div className="px-6 py-1">
                                <h3 className='text-lg font-semibold'>{comment.user.username}</h3>
                            </div>
                            <div className="px-6 py-1 mx-6">
                                <p>{comment.description}</p>
                                <p className='font-light text-sm text-black'>Date: {moment(comment.updatedAt).format('DD/MM/YYYY HH:mm')}</p>
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
