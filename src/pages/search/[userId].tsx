import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { GetPostByUserIdRequest } from '@/redux-saga/action/postAction';
import { getUserReq } from '@/redux-saga/action/userAction'
import moment from 'moment';
import { CreateLikePostRequest } from '@/redux-saga/action/likeAction';
import * as Outline from "@heroicons/react/24/outline"
import { deleteCookie, getCookie } from 'cookies-next';
import Image from 'next/image'
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import PostCard from '@/components/postCard';

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userPosts } = useSelector((state: any) => state.postState); // Assuming postState is where the posts are stored
  const { user } = useSelector((state: any) => state.userState);
  const [refresh, setRefresh] = useState(false);
  const { userId }: any = router.query;

  const isLoggedIn = typeof window !== "undefined" && getCookie('token');

  useEffect(() => {
    if (isLoggedIn && userId) {
      dispatch(getUserReq({ userId }));
    } else {
      router.push("/login");
    }
    setTimeout(() => {
      // Refresh the data.
      dispatch(GetPostByUserIdRequest(userId));

      // Clear the refresh flag.
      setRefresh(false);
    }, 100);

    setRefresh(false);
  }, [dispatch, isLoggedIn, router, refresh, userId]);


  const handleLike = (id: number): void => {
    dispatch(CreateLikePostRequest({ id }))
    setRefresh(true)
  };

  return (
    <div className="container min-w-2xl max-w-screen-lg lg:w-2/4 mt-6 mb-20">
      <div className="bg-white mb-6 drop-shadow-md rounded-lg">
        <div className="flex p-6 border-b-2 border-gray-100">
          <button className="me-8" onClick={() => router.back()}>
            <ArrowLeftIcon className='h-8 w-8' />
          </button>
          <h1 className="text-2xl font-medium">Other Profile</h1>
        </div>
        <div className="p-6 flex justify-between">
          <div className='flex flex-row items-center'>
            {user && user.profilePicture ? (<Image src={`http://localhost:3001/public/uploads/${user.profilePicture}`} alt={user.username} width={80} height={80} className='w-10 h-10 mr-2 rounded-full' />) : <Outline.UserCircleIcon className='w-10 h-10 mr-2 fill-gray-100 stroke-gray-400' />}
            <h3 className="text-xl font-bold">{user ? user.username : ''}</h3>
          </div>
        </div>
      </div>
      <div className="">
        {userPosts ? (
          userPosts.posts.map((post: any) => (
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

