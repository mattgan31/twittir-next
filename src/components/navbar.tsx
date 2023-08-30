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
        <nav className="flex fixed bottom-0 left-0 right-0 bg-gray-200 p-4 w-screen">
            <div className="container mx-auto flex justify-center items-center ">
                <ul className="flex space-x-56">
                    <li>
                        <Link href="/">
                            <HomeIcon
                                className={`h-12 w-12 fill-blue-500 ${isHome ? 'fill-blue-900' : 'hover:fill-blue-700'
                                    }`}
                            />
                        </Link>
                    </li>
                    <li>
                        <Link href="/search">
                            <MagnifyingGlassIcon
                                className={`h-12 w-12 fill-blue-500 ${isSearch ? 'fill-blue-900' : 'hover:fill-blue-700'
                                    }`}
                            />
                        </Link>
                    </li>
                    <li>
                        <Link href="/profile">
                            <UserCircleIcon
                                className={`h-12 w-12 fill-blue-500 ${isProfile ? 'fill-blue-900' : 'hover:fill-blue-700'
                                    }`}
                            />
                        </Link>
                    </li>
                    {/* Tambahkan lebih banyak tautan navigasi jika diperlukan */}
                </ul>
            </div>
        </nav>
    );

};

export default Navbar;
