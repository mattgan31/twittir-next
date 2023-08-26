// components/Navbar.tsx
import { HomeIcon, MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid"
import Link from 'next/link';
import { useRouter } from "next/router";

const Navbar = () => {

    const router = useRouter();

    const isHome = router.pathname === '/' || router.pathname === '/home';
    const isSearch = router.pathname === '/search';
    const isProfile = router.pathname === '/profile';

    return (
        <nav className="fixed bg-gray-200 p-4 bottom-0 w-full left-0">
            <div className="container mx-auto flex justify-center items-center w-96">
                <ul className="flex space-x-56">
                    <li>
                        <Link href="/">
                            {/* <a className="text-white hover:text-gray-300">Home</a> */}
                            <HomeIcon className={`h-12 w-12 fill-blue-500 active:fill-blue-900 ${isHome ? 'fill-blue-900' : 'hover:fill-blue-700'}`} />
                        </Link>
                    </li>
                    <li>
                        <Link href="/search">
                            <MagnifyingGlassIcon className={`h-12 w-12 fill-blue-500 active:fill-blue-900 ${isSearch ? 'fill-blue-900' : 'hover:fill-blue-700'}`} />
                        </Link>
                    </li>
                    <li>
                        <Link href="/profile">
                            {/* <a className="text-white hover:text-gray-300">About</a> */}
                            <UserCircleIcon className={`h-12 w-12 fill-blue-500 active:fill-blue-900 ${isProfile ? 'fill-blue-900' : 'hover:fill-blue-700'}`} />
                        </Link>
                    </li>
                    {/* Add more navigation links as needed */}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
