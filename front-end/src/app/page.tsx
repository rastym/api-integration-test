"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const MainPage: FC = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/auth/sign-in"); // Adjust the path if necessary
  };

  const handleSignUp = () => {
    router.push("/auth/sign-up"); // Adjust the path if necessary
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl font-semibold text-gray-800">
          Vulnerability Information Search
        </h1>
        <p className="text-lg text-gray-600">
          Our app allows you to search for vulnerabilities by providing a
          domain. Stay up-to-date with the latest security vulnerabilities and
          enhance your website's safety by making informed decisions.
        </p>

        <div className="mt-8 flex justify-center space-x-4">
          <Button
            onClick={handleSignIn}
            className="px-6 py-3 text-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Sign In
          </Button>
          <Button
            onClick={handleSignUp}
            className="px-6 py-3 text-lg bg-green-600 text-white hover:bg-green-700"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
