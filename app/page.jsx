"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiUser,
} from "react-icons/fi";

export default function Home() {
  const router = useRouter();
  const { user, token, loading } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);

  useEffect(() => {
    if (!loading && !token) {
      router.replace("/login");
    }
  }, [loading, token, router]);

  useEffect(() => {
    if (!user || !token) return;

    fetch(`http://localhost:5000/expenses/${user.email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.error(err));
  }, [user, token]);

  const totalIncome = expenses
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpenses = expenses
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-800/80 border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-green-600 dark:text-green-400">
              💰 Expense Tracker
            </h1>
          </div>
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Welcome,{" "}
                <span className="font-semibold">{user.name || user.email}</span>
              </span>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition">
                <FiUser
                  className="text-gray-700 dark:text-gray-300"
                  size={20}
                />
              </button>
              <Link
                href="/addExpense"
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold transition duration-200 shadow-md hover:shadow-lg"
              >
                + Add Expense
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {user && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition duration-300"></div>
                <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition duration-300 border border-green-100 dark:border-green-900/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-xl">
                      <FiTrendingUp className="text-green-600 dark:text-green-400 text-2xl" />
                    </div>
                    <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">
                      Income
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
                    Total Income
                  </p>
                  <p className="text-4xl font-black text-green-600 dark:text-green-400">
                    Tk {totalIncome.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-rose-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition duration-300"></div>
                <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition duration-300 border border-red-100 dark:border-red-900/30">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-xl">
                      <FiTrendingDown className="text-red-600 dark:text-red-400 text-2xl" />
                    </div>
                    <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
                      Expenses
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
                    Total Expenses
                  </p>
                  <p className="text-4xl font-black text-red-600 dark:text-red-400">
                    Tk {totalExpenses.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="group relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${balance >= 0 ? "from-blue-500 to-cyan-500" : "from-orange-500 to-red-500"} rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition duration-300`}
                ></div>
                <div
                  className={`relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition duration-300 border ${balance >= 0 ? "border-blue-100 dark:border-blue-900/30" : "border-orange-100 dark:border-orange-900/30"}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`${balance >= 0 ? "bg-blue-100 dark:bg-blue-900/30" : "bg-orange-100 dark:bg-orange-900/30"} p-4 rounded-xl`}
                    >
                      <span
                        className={`text-2xl ${balance >= 0 ? "text-blue-600 dark:text-blue-400" : "text-orange-600 dark:text-orange-400"}`}
                      >
                        ⚖️
                      </span>
                    </div>
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${balance >= 0 ? "text-blue-600 dark:text-blue-400" : "text-orange-600 dark:text-orange-400"}`}
                    >
                      Balance
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
                    Net Balance
                  </p>
                  <p
                    className={`text-4xl font-black ${balance >= 0 ? "text-blue-600 dark:text-blue-400" : "text-orange-600 dark:text-orange-400"}`}
                  >
                    {balance >= 0 ? "+" : "-"}Tk{" "}
                    {Math.abs(balance).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-gray-200 dark:border-slate-700">
              <div className="px-8 py-6 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 border-b border-gray-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  📊 Recent Transactions
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {expenses.length} transaction
                  {expenses.length !== 1 ? "s" : ""} found
                </p>
              </div>

              {expenses.length === 0 ? (
                <div className="px-8 py-16 text-center">
                  <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                    No transactions yet
                  </p>
                  <Link
                    href="/addExpense"
                    className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                  >
                    Start Adding Expenses
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-slate-700">
                  {expenses.map((item, index) => (
                    <div
                      key={item._id || item.id}
                      className="px-8 py-5 hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50 dark:hover:from-slate-700/50 dark:hover:to-slate-700/30 transition duration-200 flex items-center justify-between cursor-pointer group"
                      onClick={() =>
                        setExpandedItem(expandedItem === index ? null : index)
                      }
                    >
                      <div className="flex items-center gap-5 flex-1">
                        <div
                          className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                            item.type === "income"
                              ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                              : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                          }`}
                        >
                          {item.type === "income" ? "↑" : "↓"}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                            {item.title}
                          </h3>
                          <div className="flex gap-3 mt-1">
                            <span className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded-full">
                              {item.category}
                            </span>
                            {item.date && (
                              <span className="text-xs text-gray-600 dark:text-gray-400">
                                {item.date}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-6">
                        <div>
                          <p
                            className={`text-xl font-black ${
                              item.type === "income"
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {item.type === "income" ? "+" : "-"}Tk
                            {item.amount.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mt-1">
                            {item.type}
                          </p>
                        </div>
                        <span className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                          {expandedItem === index ? "−" : "+"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
