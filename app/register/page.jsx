"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff, FiCheckCircle } from "react-icons/fi";

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("password mismatch");
      return;
    }

    setIsLoading(true);

    const formData = {
      name,
      email,
      password,
      createdAt: new Date().toLocaleDateString(),
    };

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Registration successful:", data);
        alert("Registration successful!");
        router.push("/login");
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        alert("An error occurred during registration.");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-slate-700">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-block mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">💰</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold">
              <span className="text-green-600 dark:text-green-400">Expense</span>
              <span className="text-blue-600 dark:text-blue-400">Tracker</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
              Create your account to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white transition"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white transition"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 text-sm">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-slate-700 dark:text-white transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition"
                >
                  {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                required
                className="w-5 h-5 text-green-600 rounded-lg focus:ring-2 focus:ring-green-500 cursor-pointer"
              />
              <span className="text-gray-700 dark:text-gray-300 text-sm group-hover:text-gray-900 dark:group-hover:text-white transition">
                I agree to the <span className="text-green-600 dark:text-green-400 font-semibold">Terms and Conditions</span>
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-xl transition duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating account...
                </>
              ) : (
                <>
                  <FiCheckCircle />
                  Sign Up
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-slate-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400">Or</span>
            </div>
          </div>

          {/* Sign In Link */}
          <p className="text-center text-gray-700 dark:text-gray-300 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 dark:text-gray-400 text-xs mt-6">
          © 2026 Expense Tracker. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
