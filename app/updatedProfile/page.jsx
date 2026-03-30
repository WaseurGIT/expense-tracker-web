"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSave, FiX } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { user, token, loading } = useAuth();
  const [profileImage, setProfileImage] = useState(null);
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const email = form.email.value.trim();
    const dateOfBirth = form.dateOfBirth.value;
    const phone = form.phone.value.trim();
    const address = form.address.value.trim();
    const jobTitle = form.jobTitle.value.trim();
    const department = form.department.value.trim();
    const relationship = form.relationship.value.trim();
    const bio = form.bio.value.trim();

    const formData = {
      name: `${firstName} ${lastName}`,
      email,
      profileImage,
      dateOfBirth,
      phone,
      address,
      jobTitle,
      department,
      relationship,
      bio,
      updatedAt: new Date().toLocaleString(),
    };

    fetch("http://localhost:5000/updateProfile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          alert("Profile updated successfully!");
          router.push("/profile");
        } else {
          alert("Failed to update profile. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("An error occurred. Please try again.");
      });

    console.log("Form data:", formData);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <div className="rounded-xl overflow-hidden">
          <div className="flex items-center justify-center text-2xl my-6 font-semibold ">
            <h1>Update Profile Information</h1>
          </div>
          <div className="px-6 md:px-10 pb-10">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="w-full">
                  <label className="block font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    Name
                  </label>

                  <div className="flex flex-col md:flex-row gap-4">
                    <input
                      type="text"
                      name="firstName"
                      defaultValue={user?.name.split(" ")[0] || ""}
                      placeholder="First name"
                      className="w-full px-4 py-3 rounded-md bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition"
                    />

                    <input
                      type="text"
                      name="lastName"
                      defaultValue={user?.name.split(" ")[1] || ""}
                      placeholder="Last name"
                      className="w-full px-4 py-3 rounded-md bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={user?.email || ""}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 rounded-md bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Profile Image URL
                  </label>
                  <input
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    placeholder="https://example.com/profileImage.jpg"
                    className="w-full px-4 py-3 rounded-md bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    placeholder="Enter your date of birth"
                    className="w-full px-4 py-3 rounded-md bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your current phone number"
                    className="w-full px-4 py-3 rounded-md bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Address
                  </label>
                  <textarea
                    type="text"
                    name="address"
                    placeholder="Current Address"
                    rows="3"
                    className="w-full px-4 py-3 rounded-md bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    placeholder="Job title"
                    className="w-full px-4 py-3 rounded-md bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    placeholder="Job department"
                    className="w-full px-4 py-3 rounded-md bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Relationship
                  </label>
                  <input
                    type="text"
                    name="relationship"
                    placeholder="Relationship status"
                    className="w-full px-4 py-3 rounded-md bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Bio
                  </label>
                  <input
                    type="text"
                    name="bio"
                    placeholder="Add some bio"
                    className="w-full px-4 py-3 rounded-md bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 cursor-pointer py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
                >
                  <FiSave />
                  Save Changes
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center justify-center gap-2 cursor-pointer py-3 rounded-xl bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold transition"
                >
                  <FiX />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
