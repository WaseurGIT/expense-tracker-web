"use client";

import { useEffect, useState } from "react";
import { Pie, PieChart, Sector } from "recharts";
import { useAuth } from "../context/AuthContext";

// Colors for income and expense
const COLORS = ["#00C49F", "#FF8042"]; // Income = green, Expense = orange
const RADIAN = Math.PI / 180;

// Custom label function
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = Number(cx) + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = Number(cy) + radius * Math.sin(-(midAngle ?? 0) * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor={x > Number(cx) ? "start" : "end"} dominantBaseline="central">
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

// Custom sector for coloring
const MyCustomPie = (props) => <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;

export default function PieChartWithExpenses() {
  const [expenses, setExpenses] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:5000/expenses/${user.email}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => setExpenses(data))
      .catch(err => console.error("Fetch error:", err));
  }, [user?.email]);

  // Summarize income and expense
  const summary = expenses.reduce(
    (acc, item) => {
      if (item.type === "income") acc.income += item.amount;
      else if (item.type === "expense") acc.expense += item.amount;
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const pieData = [
    { name: "Income", value: summary.income },
    { name: "Expense", value: summary.expense },
  ];

  return (
    <PieChart style={{ width: "100%", maxWidth: "500px", maxHeight: "80vh", aspectRatio: 1 }} responsive>
      <Pie
        data={pieData}
        labelLine={false}
        label={renderCustomizedLabel}
        dataKey="value"
        shape={MyCustomPie}
      />
    </PieChart>
  );
}