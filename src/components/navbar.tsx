import { HomeIcon, MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Link from 'next/link';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Navbar = () => {
    const router = useRouter();

    const mainPages = ['/', '/home', '/search', '/profile']
    const isHome = router.pathname === '/' || router.pathname === '/home';
    const isSearch = router.pathname === '/search';
    const isProfile = router.pathname === '/profile';
    const isMainPage = mainPages.includes(router.pathname)

    // Use the useState hook to manage the visibility of the navbar
    const [navbarVisible, setNavbarVisible] = useState(true);

    useEffect(() => {
        // Add an event listener to handle window resize
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
    }, []);

    return (
        <div>
            <aside className={`fixed bg-white p-4 drop-shadow-lg rounded-lg xl:w-72 2xl:w-1/5 ${!isMainPage ? 'hidden' : ''} ${navbarVisible ? 'w-1/6 top-6 left-6 right-0' : 'w-full bottom-0 left-0 right-0'}`}>
                <div className={`flex ${navbarVisible ? 'flex-col' : 'flex-row justify-around'}`}>
                    <div className={`pt-2 pb-6 pl-2 border-stone-500 ${navbarVisible ? '' : 'hidden block'}`}>
                        <h1 className="text-2xl font-bold text-sky-600">Twittir</h1>
                    </div>
                    <div className={`p-2 rounded-lg ${isHome ? 'bg-sky-600' : ''}`}>
                        <Link href="/" className="flex items-center">
                            <HomeIcon
                                className={`h-8 w-8 hover:fill-blue-700 ${isHome ? 'fill-white' : 'fill-sky-600'}`}
                            />
                            <p className={`ml-2 ${isHome ? 'text-white' : 'text-sky-600'}`}>Home</p>
                        </Link>
                    </div>
                    <div className={`p-2 rounded-lg ${isSearch ? 'bg-sky-600' : ''}`}>
                        <Link href="/search" className="flex items-center">
                            <MagnifyingGlassIcon
                                className={`h-8 w-8 hover:fill-blue-700 ${isSearch ? 'fill-white' : 'fill-sky-600'}`}
                            />
                            <p className={`ml-2 ${isSearch ? 'text-white' : 'text-sky-600'}`}>Search</p>
                        </Link>
                    </div>
                    <div className={`p-2 rounded-lg ${isProfile ? 'bg-sky-600' : ''}`}>
                        <Link href="/profile" className="flex items-center">
                            <UserCircleIcon
                                className={`h-8 w-8 hover:fill-blue-700 ${isProfile ? 'fill-white' : 'fill-sky-600'}`}
                            />
                            <p className={`ml-2 ${isProfile ? 'text-white' : 'text-sky-600'}`}>Profile</p>
                        </Link>
                    </div>
                    {/* Tambahkan lebih banyak tautan navigasi jika diperlukan */}
                </div>
            </aside>
        </div>
    );
};

export default Navbar;
