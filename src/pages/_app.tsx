import store from "@/redux-saga/store";
import "@/app/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Navbar from "@/components/navbar";
import { useRouter } from "next/router";
export default function App({ Component, pageProps }: AppProps) {

    const router = useRouter();
    const isLoginPage = router.pathname === '/login';
    const isRegisterPage = router.pathname === '/register';

    if (isLoginPage || isRegisterPage) {
        return (
            <Provider store={store}>
                <main className="flex flex-col items-center h-fit max-h-full ">
                    <Component {...pageProps} />
                </main>
            </Provider>
        )
    }

    return (
        <Provider store={store}>
            <main className="flex flex-col items-center bg-gray-100 min-h-screen h-fit max-h-full ">
                <Component {...pageProps} />
            </main>
            <Navbar />
        </Provider>
    );
}
