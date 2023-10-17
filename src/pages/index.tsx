import React from "react";
import Home from "@/pages/home"; // Import the correct path to your component
import { authMiddleware } from "./protected-page";

export const getServerSideProps = authMiddleware;

export default function Index({ token }: { token: any }) {
  return (
    <>
      {/* Add any other components or content here */}
      <Home />
    </>
  );
}
