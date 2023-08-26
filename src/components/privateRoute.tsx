// components/PrivateRoute.tsx

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { checkSession } from '@/hooks/authCheck'; // Import your useAuthCheck hook

const PrivateRoute = ({ children }: any) => {
    const router = useRouter();

    useEffect(() => {
        try {
            checkSession();
        } catch (error) {
            router.push('/login');
        }

    }, [router]);
};

export default PrivateRoute;
