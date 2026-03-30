"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { FiArrowLeft, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { useState } from "react";

const AddExpensePage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedType, setSelectedType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    "Food",
    "Utilities",
    "Travel",
    "Health",
    "Tution",
    "Entertainment",
    "Other",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const type = form.type.value;
    const amount = parseFloat(form.amount.value);

    const token = localStorage.getItem("token");

    const formData = {
      title,
      category,
      type,
      amount,
      email: user.email,
      date: new Date().toLocaleDateString(),
    };

    if (!formData.title.trim()) {
      alert("Please enter a title");
      return;
    }
    if (!formData.category) {
      alert("Please select a category");
      return;
    }
    if (!formData.type) {
      alert("Please select a type");
      return;
    }
    if (!formData.amount || formData.amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setIsLoading(true);

    fetch("http://localhost:5000/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Saved:", data);
        alert("Transaction added successfully!");
      })
      .catch((err) => {
        console.error(err);
        alert("Error adding transaction");
      })
      .finally(() => setIsLoading(false));

    form.reset();
    setSelectedType("");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition font-semibold"
        >
          <FiArrowLeft />
          Back
        </button>

        <div className="mb-8">
          <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
            ➕ Add Transaction
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Record your income or expense to track your finances
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-10 border border-gray-200 dark:border-slate-700">
          <div className="mb-5">
            <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 font-bold mb-3 text-md">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              placeholder="e.g., Groceries, Salary, Utilities"
              className="w-full px-5 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:outline-none focus:border-green-500 dark:focus:border-green-400 dark:bg-slate-700 dark:text-white transition placeholder-gray-400"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="category" className="block text-gray-700 dark:text-gray-300 font-bold mb-3 text-lg">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              required
              className="w-full px-5 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:outline-none focus:border-green-500 dark:focus:border-green-400 dark:bg-slate-700 dark:text-white transition cursor-pointer"
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-4 text-lg">
              Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              {/* Income Option */}
              <label className={`relative p-5 border-2 rounded-xl cursor-pointer transition ${
                selectedType === "income"
                  ? "border-green-500 bg-green-50 dark:bg-green-900/30"
                  : "border-gray-300 dark:border-slate-600 hover:border-green-300"
              }`}>
                <input
                  type="radio"
                  name="type"
                  value="income"
                  required
                  className="absolute w-4 h-4 checked:accent-green-500"
                  onChange={(e) => setSelectedType(e.target.value)}
                />
                <div className="flex items-center gap-3 ml-6">
                  <FiTrendingUp className="text-2xl text-green-600 dark:text-green-400" />
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">Income</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Money earned</p>
                  </div>
                </div>
              </label>

              {/* Expense Option */}
              <label className={`relative p-5 border-2 rounded-xl cursor-pointer transition ${
                selectedType === "expense"
                  ? "border-red-500 bg-red-50 dark:bg-red-900/30"
                  : "border-gray-300 dark:border-slate-600 hover:border-red-300"
              }`}>
                <input
                  type="radio"
                  name="type"
                  value="expense"
                  required
                  className="absolute w-4 h-4 checked:accent-red-500"
                  onChange={(e) => setSelectedType(e.target.value)}
                />
                <div className="flex items-center gap-3 ml-6">
                  <FiTrendingDown className="text-2xl text-red-600 dark:text-red-400" />
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">Expense</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Money spent</p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Amount Field */}
          <div className="mb-8">
            <label htmlFor="amount" className="block text-gray-700 dark:text-gray-300 font-bold mb-3 text-lg">
              Amount <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-700 dark:text-gray-300 font-bold text-lg">
                Tk
              </span>
              <input
                type="number"
                id="amount"
                name="amount"
                required
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full pl-12 pr-5 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-xl focus:outline-none focus:border-green-500 dark:focus:border-green-400 dark:bg-slate-700 dark:text-white transition placeholder-gray-400 text-lg"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl transition duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-2 text-lg"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Adding...
                </>
              ) : (
                <>
                  ✓ Add Transaction
                </>
              )}
            </button>
            <button
              type="reset"
              onClick={() => setSelectedType("")}
              className="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-900 dark:text-white font-bold py-4 px-6 rounded-xl transition duration-200 shadow-md hover:shadow-lg transform hover:scale-105 text-lg"
            >
              ↻ Clear
            </button>
          </div>
        </form>

        {/* Info Card */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-2xl p-6">
          <p className="text-blue-900 dark:text-blue-300 text-sm">
            <span className="font-bold">💡 Tip:</span> Keep track of all your transactions to get accurate insights about your spending and saving habits.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddExpensePage;
