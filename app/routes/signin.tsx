import React from "react";
import PixelCard from "~/components/PixelCard";

function SignIn() {
  return (
    <div className="flex justify-between items-center gap-4 p-4 w-full h-screen bg-black">
      {/* Left Pane - Sign In Form */}
      <div className="flex flex-col justify-around items-center gap-6 h-full w-full md:w-[50%] p-6 border border-gray-300 rounded-lg shadow-lg bg-black">
        <h1 className="text-3xl text-white font-semibold text-center">
          Log in to your account
        </h1>
        <form className="flex flex-col gap-4 w-full">
          <label htmlFor="email" className="text-lg text-white font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="text-white bg-white/20 border-gray-300 rounded p-2 w-full"
            placeholder="Enter your email"
            required
          />

          <label htmlFor="password" className="text-white text-lg font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="text-white bg-white/20 border-gray-300 rounded p-2 w-full"
            placeholder="Enter your password"
            required
          />

          <a href="/dashboard">
            <button
              type="button"
              className="bg-blue-500 text-white rounded p-2 mt-4 hover:bg-blue-600 w-full"
            >
              Log In
            </button>
          </a>

          <div className="h-[2px] bg-gray-300 w-full" />
          <p className="text-center text-gray-500">
            Request access from your faculty in order to proceed
          </p>
        </form>
      </div>

      {/* Right Pane - Pixel Card */}
      <div className="w-full h-full relative rounded-xl">
        <PixelCard variant="blue">
          <h1 className="text-3xl font-bold absolute text-white">
            Welcome Back!
          </h1>
        </PixelCard>
      </div>
    </div>
  );
}

export default SignIn;
