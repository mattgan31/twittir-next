import store from "@/redux-saga/store";
import "@/app/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Navbar from "@/components/navbar";
import { useRouter } from "next/router";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { ThemeSwitcher } from "@/components/theme-switcher";

export function reportWebVitals(metric: any) {
  console.log(metric);
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <Provider store={store}>
      <NextUIProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          themes={["light", "dark"]}
          enableSystem={false}
        >
          <Head>
            <title>Twittir</title>
          </Head>
          <main
            className={`flex flex-col items-center bg-gray-100 dark:bg-slate-800 min-h-screen h-fit max-h-full w-screen mx-auto`}
          >
            <Component {...pageProps} />
          </main>

          <Navbar />
        </ThemeProvider>
      </NextUIProvider>
    </Provider>
  );
}
