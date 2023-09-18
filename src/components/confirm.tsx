import { DeletePostRequest } from '@/redux-saga/action/postAction';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';

export default function Confirm({ id, toggleConfirmModal, setRefresh }: any) {
    const dispatch = useDispatch();
    const router = useRouter();
    const handleConfirm = () => {
        dispatch(DeletePostRequest(id));
        router.back();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-75 bg-gray-700">
            <div className="bg-white max-w-md p-6 rounded-lg shadow-lg dark:bg-white">
                <button
                    type="button"
                    className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="popup-modal"
                    onClick={toggleConfirmModal}
                >
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
                <div className="text-center">
                    <svg className="mx-auto mb-4 text-gray-600 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-600">Are you sure you want to delete this <span className='font-bold'>post</span>?</h3>
                    <div className='w-full flex justify-evenly'>
                        <button
                            type="button"
                            className="text-white bg-green-600 w-1/3 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm items-center px-5 py-2.5 text-center"
                            data-modal-hide="popup-modal"
                            onClick={toggleConfirmModal}
                        >
                            No, cancel
                        </button>
                        <button
                            type="button"
                            className="text-red-100 bg-red-500 w-1/3 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-200 rounded-lg border border-red-200 text-sm font-medium px-5 py-2.5 hover:text-red-200 focus:z-10"
                            data-modal-hide="popup-modal"
                            onClick={handleConfirm}
                        >
                            Yes, sure
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
