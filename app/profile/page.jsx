"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import {
  FiMail,
  FiArrowLeft,
  FiEdit2,
  FiLogOut,
  FiPhone,
  FiMapPin,
  FiBriefcase,
  FiCalendar,
  FiUser,
  FiHeart,
} from "react-icons/fi";

export default function ProfilePage() {
  const router = useRouter();
  const { user, token, logout, loading, setLoading } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!loading && !token) {
      router.replace("/login");
      return;
    }
  }, [loading, token, router]);

  useEffect(() => {
    if (!user || !token) return;
    fetch(`http://localhost:5000/fullProfile/${user.email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((profileData) => {
        setUserData({ ...user, ...profileData });
        console.log("Fetched profile data:", profileData);
        setLoading(false);
      });
  }, [user, token]);

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getColorClass = (name) => {
    const colors = [
      "from-indigo-400 to-indigo-600",
      "from-purple-400 to-purple-600",
      "from-pink-400 to-pink-600",
      "from-green-400 to-green-600",
      "from-red-400 to-red-600",
      "from-yellow-400 to-yellow-600",
    ];
    if (!name) return colors[0];
    const hash = name.charCodeAt(0) + name.charCodeAt(name.length - 1);
    return colors[hash % colors.length];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
        <div className="animate-pulse text-gray-600 dark:text-gray-400 text-lg">
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
        >
          <FiArrowLeft />
          Back
        </button>

        <div className="rounded-3xl shadow-2xl overflow-hidden">
          <div className="h-40 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          <div className="px-6 md:px-10 pb-10">
            <div className="flex flex-col md:flex-row gap-8 -mt-20 mb-10">
              <div className="flex flex-col items-center md:items-start">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center shadow-xl border-4 border-white dark:border-slate-800 overflow-hidden">
                  {userData?.profileImage ? (
                    <img
                      src={userData.profileImage}
                      alt={userData?.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-5xl font-bold text-white">
                      {getInitials(userData?.name)}
                    </span>
                  )}
                </div>
                <h1 className="mt-6 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center md:text-left">
                  {userData?.name || "User"}
                </h1>
                <p className="text-indigo-600 font-semibold mt-2">
                  {userData?.jobTitle}
                </p>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-4 mt-0 md:mt-8">
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                  <p className="text-xs text-gray-500 uppercase font-semibold">
                    Department
                  </p>
                  <p className="text-gray-900 dark:text-white font-semibold mt-1">
                    {userData?.department || "—"}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20">
                  <p className="text-xs text-gray-500 uppercase font-semibold">
                    Relationship
                  </p>
                  <p className="text-gray-900 dark:text-white font-semibold mt-1">
                    {userData?.relationship || "—"}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20">
                  <p className="text-xs text-gray-500 uppercase font-semibold">
                    Status
                  </p>
                  <p className="text-green-600 font-semibold mt-1">
                    Active & Verified
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-pink-50 dark:bg-pink-900/20">
                  <p className="text-xs text-gray-500 uppercase font-semibold">
                    Last Updated
                  </p>
                  <p className="text-gray-900 dark:text-white font-semibold text-xs mt-1">
                    {userData?.updatedAt || "—"}
                  </p>
                </div>
              </div>
            </div>

            {userData?.bio && (
              <div className="mb-8 p-5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500">
                <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                  {userData.bio}
                </p>
              </div>
            )}

            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                  <FiMail className="text-blue-600 text-2xl flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Email
                    </p>
                    <p className="text-gray-900 dark:text-white font-medium break-all">
                      {userData?.email || "—"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-cyan-50 dark:bg-cyan-900/20">
                  <FiPhone className="text-cyan-600 text-2xl flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Phone
                    </p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {userData?.phone || "—"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 md:col-span-2">
                  <FiMapPin className="text-orange-600 text-2xl flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Address
                    </p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {userData?.address || "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Professional Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20">
                  <FiBriefcase className="text-indigo-600 text-2xl flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Job Title
                    </p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {userData?.jobTitle || "—"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-violet-50 dark:bg-violet-900/20">
                  <FiUser className="text-violet-600 text-2xl flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Department
                    </p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {userData?.department || "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Personal Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20">
                  <FiCalendar className="text-rose-600 text-2xl flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Date of Birth
                    </p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {userData?.dateOfBirth || "—"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/20">
                  <FiHeart className="text-red-600 text-2xl flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Relationship
                    </p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {userData?.relationship || "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-10 pt-8 border-t border-gray-200 dark:border-slate-700">
              <button
                onClick={() => router.push("/updatedProfile")}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
              >
                <FiEdit2 />
                Edit Profile
              </button>

              <button
                onClick={() => {
                  logout?.();
                  router.push("/login");
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition"
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
