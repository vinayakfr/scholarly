import React, { useState } from "react";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Proceed with form submission (e.g., API call)
    console.log("Form submitted:", { email, password });
  };

  return (
    <div className="flex flex-col place-content-center place-items-center w-full h-screen p-4">
      <nav className="text-left w-full">
        <h1 className="text-3xl font-bold">Scholarly</h1>
      </nav>
      <div className="flex flex-col place-content-center place-items-center w-full h-full">
        <div className="flex flex-col place-content-center place-items-start p-3 border border-black rounded-lg w-[40%]">
          <h2 className="text-center text-2xl font-bold mb-4 w-full">Sign In</h2>
          <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
            {error && (
              <div className="text-red-500 text-sm mb-2">{error}</div>
            )}
            <label htmlFor="email" className="text-lg font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password" className="text-lg font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded p-2 mt-4 hover:bg-blue-600"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
