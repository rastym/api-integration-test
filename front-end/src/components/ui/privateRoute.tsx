"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Get the token from localStorage

    if (!token) {
      // If no token, redirect to the login page
      router.push("/auth/sign-in");
    } else {
      // Optionally, you could validate the token here by calling an API or decoding it
      // For now, just set loading to false when token is available
      setLoading(false);
    }
  }, [router]);

  // While loading (checking for token), show a loading spinner or similar
  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default PrivateRoute;
