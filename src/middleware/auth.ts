// middleware/auth.js
import { verify } from 'jsonwebtoken';
import { GetServerSideProps } from 'next';

export const authMiddleware: GetServerSideProps = async (context: any) => {
    const token = context.req.cookies.token;

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        };
    }

    try {
        const decoded = verify(token, 's3kret'); // Ganti 'your-secret-key' dengan kunci rahasia Anda
        return {
            props: { user: decoded }
        };

    } catch (error) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        };
    }
};
