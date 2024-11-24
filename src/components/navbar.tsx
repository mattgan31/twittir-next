import {
  HomeIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@nextui-org/react";
import { ThemeSwitcher } from "./theme-switcher";
import ProfileCard from "./ui/profile-card";

const Navbar = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<any>();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const mainPages = ["/", "/home", "/user/search", "/profile"];
  const isHome = router.pathname === "/" || router.pathname === "/home";
  const isSearch = router.pathname === "/user/search";
  const isProfile = router.pathname === "/profile";
  const isMainPage = mainPages.includes(router.pathname);

  // Use the useState hook to manage the visibility of the navbar
  const [navbarVisible, setNavbarVisible] = useState(true);
  const cookiesString = getCookie("profile") as string;
  useEffect(() => {
    // Add an event listener to handle window resize

    if (cookiesString) {
      const cookiesObject = JSON.parse(cookiesString);
      setProfile(cookiesObject);
    }
    const handleResize = () => {
      // Toggle the navbar visibility based on the screen size
      if (window.innerWidth <= 1024) {
        setNavbarVisible(false);
      } else {
        setNavbarVisible(true);
      }
    };

    // Initialize the visibility based on the initial screen size
    handleResize();

    // Add the event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [cookiesString]);

  return (
    <div>
      <aside
        className={`fixed flex lg:flex-col bg-white dark:bg-slate-800 p-4 drop-shadow-lg items-center justify-center rounded-lg xl:w-72 2xl:w-1/5 ${
          !isMainPage ? "hidden" : ""
        } ${
          navbarVisible
            ? "w-1/6 top-6 left-6 right-0"
            : "w-full bottom-0 left-0 right-0"
        }`}
      >
        <div
          className={`flex lg:mb-10 w-full ${
            navbarVisible ? "flex-col space-y-2" : "flex-row justify-around"
          }`}
        >
          <div
            className={`pt-2 pb-6 pl-2 border-stone-500 ${
              navbarVisible ? "" : "hidden block"
            }`}
          >
            <h1 className="text-2xl font-bold dark:text-white text-sky-600">
              Twittir
            </h1>
          </div>
          <div className={`p-2 rounded-lg ${isHome ? "bg-sky-600" : ""}`}>
            <Link href="/" className="flex items-center">
              <HomeIcon
                className={`h-8 w-8 hover:fill-blue-700 ${
                  isHome ? "fill-white" : "fill-sky-600 dark:fill-white"
                }`}
              />
              <p
                className={`ml-2 sm:hidden lg:block ${
                  isHome ? "text-white" : "text-sky-600 dark:text-white"
                }`}
              >
                Home
              </p>
            </Link>
          </div>
          <div className={`p-2 rounded-lg ${isSearch ? "bg-sky-600" : ""}`}>
            <Link href="/user/search" className="flex items-center">
              <MagnifyingGlassIcon
                className={`h-8 w-8 hover:fill-blue-700 ${
                  isSearch ? "fill-white" : "fill-sky-600 dark:fill-white"
                }`}
              />
              <p
                className={`ml-2 sm:hidden lg:block ${
                  isSearch ? "text-white" : "text-sky-600 dark:text-white"
                }`}
              >
                Search
              </p>
            </Link>
          </div>
          <div className={`p-2 rounded-lg ${isProfile ? "bg-sky-600" : ""}`}>
            <Link href="/profile" className="flex items-center">
              <UserCircleIcon
                className={`h-8 w-8 hover:fill-blue-700 ${
                  isProfile ? "fill-white" : "fill-sky-600 dark:fill-white"
                }`}
              />
              <p
                className={`ml-2 sm:hidden lg:block ${
                  isProfile ? "text-white" : "text-sky-600 dark:text-white"
                }`}
              >
                Profile
              </p>
            </Link>
          </div>
          <ThemeSwitcher />
          {/* Tambahkan lebih banyak tautan navigasi jika diperlukan */}
        </div>
        <ProfileCard navbarVisible={navbarVisible} profile={profile} />
      </aside>
    </div>
  );
};

export default Navbar;
