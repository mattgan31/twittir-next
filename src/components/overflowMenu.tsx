import React, { useEffect, useRef, useState } from 'react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux';
import { DeletePostRequest } from '@/redux-saga/action/postAction';
import Confirm from './confirm';
export default function OverflowMenu({ id, toggleConfirmModal, setRefresh }: any) {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const confirmDelete = () => {
        // Jika pengguna mengonfirmasi, hapus postingan
        dispatch(DeletePostRequest(id));
        setRefresh(true);
        // Sembunyikan modal konfirmasi
        toggleConfirmModal();
    }

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        const handleEscapeKey = (event: any) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isOpen]);

    return (
        <div>
            <button onClick={toggleMenu}><EllipsisVerticalIcon className="w-6 h-6" /></button>
            {isOpen && (
                <div className="absolute bg-white w-fill p-2 shadow-md rounded-lg" ref={menuRef}>
                    <button className='p-2 hover:bg-slate-200 w-full my-0.5'>Edit</button>
                    {/* <button className='p-2 hover:bg-slate-200 w-full my-0.5' onClick={() => deletePost(prop.id)}>Delete</button> */}
                    <button className='p-2 hover:bg-slate-200 w-full my-0.5' onClick={toggleConfirmModal}>Delete</button>
                    <button className='p-2 hover:bg-slate-200 w-full my-0.5'>Share</button>
                </div>
            )}
        </div>
    )
}
