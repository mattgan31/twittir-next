import React from 'react';
import Image from 'next/image';
import OverflowMenu from './overflowMenu';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { CreateLikePostRequest } from '@/redux-saga/action/likeAction';
import * as Outline from '@heroicons/react/24/outline'
import router from 'next/router';
import { getCookie } from 'cookies-next';
import Link from 'next/link';

export default function PostCard({ post, setRefresh, showConfirmModal, toggleConfirmModal }: any) {

    const dispatch = useDispatch();

    const handleLike = (id: number): void => {
        dispatch(CreateLikePostRequest({ id }))
        setRefresh(true)
    };

    const profile = typeof window !== "undefined" && JSON.parse(getCookie('profile') || '{}');

    return (
        <div
            key={post.id}
            className="container item-center justify-center py-4 drop-shadow-md bg-white mb-6 rounded-lg min-w-2xl max-w-screen-lg w-full"
        >
            <div className="px-6 py-1 flex flex-row items-center justify-between">
                <div className="flex flex-row items-center">
                    {post.user.profile_picture ? (<Image src={`http://localhost:3001/public/uploads/${post.user.profile_picture}`} alt={post.user.username} width={80} height={80} className='w-10 h-10 mr-2 rounded-full' />) : <Outline.UserCircleIcon className='w-10 h-10 mr-2 fill-gray-100 stroke-gray-400' />}
                    <h3 className="text-lg font-medium cursor-pointer">{post.user.username}</h3>
                </div>
            </div>
            <Link href={"/posts/[itemId]"} as={`/posts/${post.id}`}>
                <div className="px-3 pt-1 pb-4  mx-6 cursor-pointer border-b-2">
                    <p className="mb-3 text-base">{post.post}</p>
                    <p className="font-light text-sm text-black">
                        Date: {moment(post.createdAt).format("DD/MM/YYYY HH:mm")}
                    </p>
                </div>
            </Link>
            <div className="flex justify-center px-3 py-1 rounded-lg mt-3 mx-6 cursor-pointer">
                <div className="w-1/2 text-center flex justify-center" onClick={() => handleLike(post.id)}>
                    <Outline.HeartIcon className={`h-8 w-8 ${post.likes.some((like: any) => like.user.id === profile.id) ? 'fill-red-600' : ''}`} /><p className="py-1 px-2">{post.likes.length > 0 ? post.likes.length : '0'}</p></div>
                <div className="w-1/2 text-center flex justify-center"><Outline.ChatBubbleLeftIcon className="h-8 w-8" /><p className="py-1 px-2">{post.comments.length > 0 ? post.comments.length : '0'}</p></div>
            </div>
        </div>
    )
}
