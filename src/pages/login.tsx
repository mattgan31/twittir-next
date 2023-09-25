import React from "react";
import { useFormik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { doSigninRequest } from "@/redux-saga/action/userAction";
import { useRouter } from "next/router";
import Link from "next/link";


export default function Login(props: any) {
    const dispatch = useDispatch();
    const route = useRouter();
    const loginError = useSelector(((state: any) => state.userState.message));
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit: async (values) => {
            try {
                const payload = {
                    username: values.username,
                    password: values.password,
                };
                dispatch(doSigninRequest(payload, () => {
                    route.push("/")
                }));
            } catch (error) {
                console.log(error);
            }
        },
    });

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col bg-slate-100 shadow-md box-content w-80 border rounded-lg p-6">
                <h2 className="text-3xl font-bold text-center text-sky-500">Twittir</h2>
                <h2 className="text-xl font-bold ml-2">Login</h2>
                {loginError ? (<div className="text-center p-2 my-2 rounded-md bg-red-100"><p className="text-red-600">{loginError} </p></div>) : <></>}
                <form onSubmit={formik.handleSubmit}>
                    <div className="p-2">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            placeholder="Username"
                            id="username"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            className="rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 block w-full p-2"
                        />
                    </div>
                    <div className="p-2">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            id="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            className="rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 block w-full p-2"
                        />
                    </div>
                    <div className="p-2">
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                        >
                            Login
                        </button>
                        <Link href={'/register'}>
                            <button className="flex w-full justify-center text-sky-600 px-3 py-1.5 my-2 rounded-md font-semibold bg-slate-100 outline-sky-500 outline outline-1 outline-offset-0 font-medium hover:bg-slate-300 hover:text-sky-900">Register</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
