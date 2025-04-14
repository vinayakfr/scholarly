import React, { useState } from "react";
import PixelCard from "~/components/PixelCard";

function SignIn() {
  const [regnum, setRegnum] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!regnum || !password) {
      setMessage("Please fill in all fields.");
      return;
    }
    if (regnum.length < 12) {
      setMessage("Registration number must be 12 characters long.");
      return;
    }
    if (regnum[0] !== "R" || regnum[1] !== "A") {
      setMessage("Registration number must start with 'RA'.");
      return;
    }

    try {
      // API call to authenticate the user
      const response = await fetch("http://localhost:5050/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ regnum: regnum, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          console.log("Success");
          setMessage("Success");
          // Redirect to dashboard
          window.location.href = "/dashboard";
        } else {
          console.log("Failure");
          setMessage("Failure");
        }
      } else {
        console.log("Failure");
        setMessage("Failure");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Request access from your faculty in order to proceed");
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
            id="text"
            name="text"
            value={regnum}
            onChange={(e) => setRegnum(e.target.value)}
            className="text-white bg-white/20 border-gray-300 rounded p-2 w-full"
            placeholder="Enter your registration number"
            required
          />

          <label htmlFor="password" className="text-white text-lg font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-white bg-white/20 border-gray-300 rounded p-2 w-full"
            placeholder="Enter your password"
            required
          />
          <button
            onClick={handleSignIn}
            type="submit"
            className="bg-blue-500 text-white rounded p-2 mt-4 hover:bg-blue-600 w-full"
          >
            Log In
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
