"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Call the backend sign-in endpoint
      const response = await axios.post("http://localhost:3001/auth/login", {
        username: email,
        password,
      });
      if (response.data.access_token) {
        // Store the JWT token in localStorage (Prefered way to store it in cookies for better security)
        localStorage.setItem("authToken", response.data.access_token);

        // Optionally, set the token in the axios header for future requests
        axios.defaults.headers[
          "Authorization"
        ] = `Bearer ${response.data.access_token}`;

        // Redirect to the main page or dashboard
        router.push("/search-by-domain");
      }
    } catch (err: any) {
      // Handle error (e.g., wrong username/password)
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
        <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-semibold text-center text-gray-800">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div>
              <Label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label
                htmlFor="password"
                className="block text-lg font-medium text-gray-700"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center mb-4">
                {error}
              </div>
            )}
            <Button
              type="submit"
              className="w-full py-3 text-lg bg-blue-600 text-white hover:bg-blue-700 rounded-md"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/auth/sign-up"
                className="text-blue-600 hover:text-blue-800"
              >
                Sign Up
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
