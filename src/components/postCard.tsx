import React from "react";
import Image from "next/image";
import moment from "moment";
import { useDispatch } from "react-redux";
import { CreateLikePostRequest } from "@/redux-saga/action/likeAction";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { ChatBubbleLeftIcon, HeartIcon } from "@heroicons/react/24/solid";
import { UserCircleIcon } from "@heroicons/react/24/solid";

export default function PostCard({ post, setRefresh }: any) {
  const dispatch = useDispatch();

  const handleLike = (id: number): void => {
    dispatch(CreateLikePostRequest({ id }));
    setRefresh(true);
  };

  const profile =
    typeof window !== "undefined" && JSON.parse(getCookie("profile") || "{}");

  return (
    <div
      key={post.id}
      className="container item-center justify-center py-4 drop-shadow-md bg-white dark:bg-slate-800 mb-6 rounded-lg min-w-2xl max-w-screen-lg w-full"
    >
      <div className="px-6 py-1 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          {post.user.profile_picture ? (
            <Image
              src={`http://localhost:3001/public/uploads/${post.user.profile_picture}`}
              alt={post.user.username}
              width={80}
              height={80}
              className="w-10 h-10 mr-2 rounded-full"
            />
          ) : (
            <UserCircleIcon className="w-10 h-10 mr-2 fill-gray-400 dark:fill-white" />
          )}
          <Link href={`/user/[userId]`} as={`user/${post.user.id}`}>
            <h3 className="sm:text-sm md:text-base lg:text-lg font-bold text-gray-700 dark:text-white cursor-pointer mr-1">
              {post.user.fullname}{" "}
            </h3>
          </Link>
          <p className="sm:text-sm md:text-base text-gray-500 dark:text-gray-200">
            @{post.user.username}
          </p>
        </div>
      </div>
      <Link href={"/posts/[itemId]"} as={`/posts/${post.id}`}>
        <div className="px-3 pt-1 pb-4  mx-6 cursor-pointer border-b-2 dark:border-slate-700">
          <p className="mb-3 text-black dark:text-white text-base font-medium">
            {post.post}
          </p>
          <p className="font-light text-sm text-black dark:text-gray-200 font-normal text-sm">
            Date: {moment(post.createdAt).format("DD/MM/YYYY HH:mm")}
          </p>
        </div>
      </Link>
      <div className="flex justify-center px-3 py-1 rounded-lg mt-3 mx-6 cursor-pointer">
        <div
          className="w-1/2 text-center flex justify-center text-black dark:text-white items-center"
          onClick={() => handleLike(post.id)}
        >
          <HeartIcon
            className={`h-6 w-6 ${
              post.likes.some((like: any) => like.user.id === profile.id)
                ? "fill-red-600"
                : "fill-gray-300"
            }`}
          />
          <p className="py-1 px-2">
            {post.likes.length > 0 ? post.likes.length : "0"}
          </p>
        </div>
        <div className="w-1/2 text-center text-black dark:text-white flex justify-center items-center">
          <ChatBubbleLeftIcon className="h-6 w-6 fill-gray-300" />
          <p className="py-1 px-2">
            {post.comments.length > 0 ? post.comments.length : "0"}
          </p>
        </div>
      </div>
    </div>
  );
}
