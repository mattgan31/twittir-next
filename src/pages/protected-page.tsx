// pages/protected-page.js
import { GetServerSideProps } from "next";
import {
  authMiddleware,
  authMiddleware as middleware,
} from "../middleware/auth";

interface User {
  username: string;
}

interface ProtectedPageProps {
  user: User;
}

const ProtectedPage = ({ user }: ProtectedPageProps) => {
  return (
    <div>
      <h1>Halaman Dilindungi {user.username}</h1>
    </div>
  );
};

export default ProtectedPage;

export { authMiddleware };

export const getServerSideProps: GetServerSideProps = middleware;
