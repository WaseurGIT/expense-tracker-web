"use client";

import Link from "next/link";
import { GoGraph } from "react-icons/go";
import { FaHome, FaUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, logOut, token, setLoading } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  const handleLogOut = () => {
    logOut();
    router.replace("/login");
  };

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

  return (
    <div>
      <div className="flex flex-col items-center justify-center my-12">
        <img
          src={userData?.profileImage}
          alt={userData?.name}
          className="w-16 h-16 object-cover rounded-full border-4 border-gray-300 dark:border-slate-600"
        />
        <h1 className="text-lg font-semibold">{user?.name}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {user?.email}
        </p>
      </div>
      <div className="flex flex-col items-start gap-6 mt-10 mx-10">
        <div className="flex items-center left-0 gap-1 hover:text-blue-500">
          <FaHome className="text-lg" />
          <Link href="/">Home</Link>
        </div>
        <div className="flex items-center gap-1">
          <GoGraph className="text-lg" />
          <Link href="/dashboard">Dashboard</Link>
        </div>
        <div className="flex items-center gap-1">
          <FaUser className="text-lg" />
          <Link href="/profile">Profile</Link>
        </div>
        <div className="flex items-center gap-1 text-red-500">
          <LuLogOut className="text-lg" />
          <button className="cursor-pointer " onClick={handleLogOut}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
