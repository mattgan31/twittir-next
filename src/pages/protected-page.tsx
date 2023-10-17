// pages/protected-page.js
import { GetServerSideProps } from 'next';
import { authMiddleware } from '../middleware/auth'; // Sesuaikan dengan path ke file middleware Anda

const ProtectedPage = ({ user }: { user: any }) => {
    return (
        <div>
            <h1>Halaman Dilindungi {user.username}</h1>
        </div>
    );
};

export default ProtectedPage;

export { authMiddleware };

export const getServerSideProps: GetServerSideProps = authMiddleware;
