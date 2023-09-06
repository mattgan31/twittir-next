import React, { useEffect, useState } from 'react'
import * as Outline from "@heroicons/react/24/outline"
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router';
import { searchUserReq } from '@/redux-saga/action/userAction';
import { getCookie } from 'cookies-next';
import Image from 'next/image';


export default function Search() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { usersList } = useSelector((state: any) => state.userState);
    const [refresh, setRefresh] = useState(false);
    const [searchUser, setSearchUser] = useState('');
    const isLoggedIn = typeof window !== "undefined" && getCookie('token') || undefined;

    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/login");
        } else {

        }
    })

    const handleInputChange = (e: any) => {
        setSearchUser(e.target.value);
        // Refresh the data.
        dispatch(searchUserReq({ username: e.target.value }));
        // Clear the refresh flag.
        setRefresh(false);
    };

    return (
        <div className="container min-w-2xl max-w-screen-lg lg:w-2/4 mt-6 mb-20">
            <div className="bg-white mb-6 drop-shadow-md rounded-lg">
                <div className="flex p-6 border-b-2">
                    <h1 className="text-2xl font-medium">Search</h1>
                </div>
                <div className="container item-center justify-center py-4">
                    <div className="px-6 pt-1 pb-5 relative justify-between items-center border-b-2">
                        <input
                            type="text"
                            onChange={handleInputChange}
                            value={searchUser}
                            name="post"
                            id="post"
                            placeholder="Search..."
                            className="rounded-md border-0 my-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 block w-full p-2 mr-2"
                        />
                        <Outline.MagnifyingGlassIcon className='absolute inset-y-3.5 right-8 flex items-center pl-2 h-8 w-8 stroke-gray-400 icon-search' />
                    </div>
                    <div className="px-6 pt-5 pb-1">
                        {usersList.users ? (
                            usersList.users.map((user: any, index: number) => (
                                <div key={index} className="py-4 border-b-2 flex flex-row items-center">
                                    {user.profile_picture ? (<Image src={`http://localhost:3001/public/uploads/${user.profile_picture}`} alt={user.username} width={80} height={80} className='w-10 h-10 mr-2 rounded-full' />) : <Outline.UserCircleIcon className='w-10 h-10 mr-2 fill-gray-100 stroke-gray-400' />}
                                    <h3 className="text-lg font-medium cursor-pointer">{user.username}</h3>
                                </div>
                            ))
                        ) : <div><p className='text-gray-500'>Search users</p></div>}
                    </div>
                </div>
            </div>
        </div>
    )
}
