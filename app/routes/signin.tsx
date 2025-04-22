import React, { useState } from "react";
import PixelCard from "~/components/PixelCard";

function SignIn() {
  const [regnum, setRegnum] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!regnum || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (regnum.length < 12) {
      setMessage("Registration number must be 12 characters long.");
      return;
    }

    if (!regnum.startsWith("RA")) {
      setMessage("Registration number must start with 'RA'.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5050/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ regnum, password }),
      });

      const data = await response.json();
      if (response.ok && data.data?.token) {
        setMessage("Login successful. Redirecting...");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      } else {
        setMessage(data.message || "Invalid credentials or user not registered.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("Request access from your faculty in order to proceed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between items-center gap-4 p-4 w-full h-screen bg-black">
      {/* Left Pane - Sign In Form */}
      <div className="flex flex-col justify-around items-center gap-6 h-full w-full md:w-[50%] p-6 border border-gray-300 rounded-lg shadow-lg bg-black">
        <h1 className="text-3xl text-white font-semibold text-center">
          Log in to your account
        </h1>

        <form className="flex flex-col gap-4 w-full" onSubmit={handleSignIn}>
          <label htmlFor="regnum" className="text-lg text-white font-medium">
            Registration Number
          </label>
          <input
            type="text"
            id="regnum"
            name="regnum"
            value={regnum}
            onChange={(e) => setRegnum(e.target.value)}
            className="text-white bg-white/20 border border-gray-300 rounded p-2 w-full"
            placeholder="Enter your registration number"
            required
          />

          <label htmlFor="password" className="text-lg text-white font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-white bg-white/20 border border-gray-300 rounded p-2 w-full"
            placeholder="Enter your password"
            required
          />

          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 mt-4 hover:bg-blue-600 w-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          {message && (
            <p className="text-center text-red-500 mt-2">{message}</p>
          )}
        </form>
      </div>

      {/* Right Pane - Pixel Card */}
      <div className="w-full h-full relative rounded-xl">
        <PixelCard variant="yellow">
          <h1 className="text-3xl font-bold absolute text-white">
            Welcome Back!
          </h1>
        </PixelCard>
      </div>
    </div>
  );
}

export default SignIn;
