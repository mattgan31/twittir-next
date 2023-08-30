import store from "@/redux-saga/store";
import "@/app/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Navbar from "@/components/navbar";
import { useRouter } from "next/router";

export function reportWebVitals(metric: any) {
    console.log(metric)
}

export default function App({ Component, pageProps }: AppProps) {

    const router = useRouter();
    const isLoginPage = router.pathname === '/login';
    const isRegisterPage = router.pathname === '/register';

    if (isLoginPage || isRegisterPage) {
        return (
            <Provider store={store}>
                <main className="flex flex-col items-center h-fit max-h-full max-w-screen min-h-3/4 mx-auto overflow-hidden">
                    <Component {...pageProps} />
                </main>
            </Provider>
        )
    }

    return (
        <Provider store={store}>
            <main className="flex flex-col items-center bg-gray-100 min-h-screen h-fit max-h-full w-screen mx-auto">
                <Component {...pageProps} />
            </main>
            <Navbar />
        </Provider>
    );
}
