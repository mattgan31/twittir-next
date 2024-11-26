import React, { useEffect, useState } from "react";
import * as Outline from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { searchUserReq } from "@/redux-saga/action/userAction";
import { getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { authMiddleware } from "../protected-page";
import { UserCircleIcon } from "@heroicons/react/24/solid";

export const getServerSideProps = authMiddleware;

export default function Search() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { usersList } = useSelector((state: any) => state.userState);
  const [refresh, setRefresh] = useState(false);
  const [searchUser, setSearchUser] = useState("");

  useEffect(() => {
    if (searchUser.trim() === "") {
      console.log("No valid search query");
      return;
    }

    // Perform actions with searchUser
    console.log("Searching for:", searchUser);
  }, [searchUser]);

  const sanitizeInput = (value: string) => {
    // Remove special characters (except spaces)
    return value.replace(/[^a-zA-Z0-9\s]/g, "");
  };

  const handleInputChange = (e: any) => {
    const rawValue = e.target.value;

    const sanitizedValue = sanitizeInput(rawValue);
    if (sanitizedValue !== "") {
      setSearchUser(sanitizedValue);
      // Refresh the data.
      dispatch(searchUserReq({ username: sanitizedValue }));
      // Clear the refresh flag.
      setRefresh(false);
    } else {
      setSearchUser("");
    }
  };

  return (
    <div className="container min-w-2xl max-w-screen-lg lg:w-2/4 mt-6 mb-20">
      <div className="bg-white dark:bg-slate-800 mb-6 drop-shadow-md rounded-lg">
        <div className="flex p-6 border-b-2 border-gray-100 dark:border-slate-700">
          <h1 className="text-2xl font-medium text-black dark:text-white">
            Search
          </h1>
        </div>
        <div className="item-center justify-center py-4 w-full">
          <div className="px-6 pt-1 pb-5 relative justify-between items-center border-b-2 border-gray-100 dark:border-slate-700">
            <input
              type="text"
              onChange={handleInputChange}
              value={searchUser}
              name="post"
              id="post"
              placeholder="Search..."
              className="rounded-md border-0 my-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 block w-full p-2 mr-2 bg-gray-100 dark:bg-slate-700 text-black dark:text-white"
            />
            <Outline.MagnifyingGlassIcon className="absolute inset-y-3.5 right-8 flex items-center pl-2 h-8 w-8 stroke-gray-400 icon-search" />
          </div>
          <div className="px-6 pt-5 pb-1">
            {usersList.length > 0 ? (
              usersList.map((user: any, index: number) => (
                <Link href={`/user/${user.id}`} key={index}>
                  <div className="py-4 border-b-2 flex flex-row items-center">
                    {user.profilePicture ? (
                      <Image
                        src={`http://localhost:3001/public/uploads/${user.profilePicture}`}
                        alt={user.username}
                        width={80}
                        height={80}
                        className="w-10 h-10 mr-2 rounded-full"
                      />
                    ) : (
                      <UserCircleIcon className="w-10 h-10 mr-2 fill-gray-400 dark:fill-white" />
                    )}
                    <h3 className="text-lg font-medium cursor-pointer text-black dark:text-white">
                      {user.username}
                    </h3>
                  </div>
                </Link>
              ))
            ) : (
              <div>
                <p className="text-gray-500">Search users</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
