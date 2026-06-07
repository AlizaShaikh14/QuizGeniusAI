import { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";

import API from "../services/api";
import AdminLayout from "../layout/AdminLayout";
import Navbar from "../components/Navbar";
import "../styles/analytics.css";



const isDark =
  document.body.classList.contains("dark");

const Analytics = () => {

  const [results, setResults] =
    useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {

  try {

    const response =
      await API.get("/result");

    setResults(response.data);

  } catch (error) {

    console.log(error);
  }
};

  const highestScore =
    results.length
      ? Math.max(
          ...results.map(
            r => r.score
          )
        )
      : 0;

  const averageScore =
    results.length
      ? (
          results.reduce(
            (a, b) =>
              a + b.score,
            0
          ) / results.length
        ).toFixed(1)
      : 0;

  const topPerformer =
    results.length
      ? results.reduce(
          (prev, current) =>
            prev.score >
            current.score
              ? prev
              : current
        )
      : null;

  const scoreChartData =
    results.map(
      result => ({

        name:
          result.username,

        score:
          result.score
      })
    );

  const performanceData = [

  {
    name: "Excellent",
    value: results.filter(
      r =>
        (r.score / r.totalQuestions) * 100 >= 80
    ).length
  },

  {
    name: "Good",
    value: results.filter(
      r =>
        (r.score / r.totalQuestions) * 100 >= 50 &&
        (r.score / r.totalQuestions) * 100 < 80
    ).length
  },

  {
    name: "Weak",
    value: results.filter(
      r =>
        (r.score / r.totalQuestions) * 100 < 50
    ).length
  }
];

console.log(results);
console.log(performanceData);

 const COLORS = [
    "#10b981",
    "#3b82f6",
    "#ef4444"
  ];

  return (

    <AdminLayout>

      <Navbar
        title="Analytics Dashboard"
        subtitle="Quiz Performance Insights"
      />

      <div className="analytics-stats">

        <div className="analytics-card">
          <h3>Total Attempts</h3>
          <h1>{results.length}</h1>
        </div>

        <div className="analytics-card">
          <h3>Highest Score</h3>
          <h1>{highestScore}</h1>
        </div>

        <div className="analytics-card">
          <h3>Average Score</h3>
          <h1>{averageScore}</h1>
        </div>

        <div className="analytics-card">
          <h3>Top Performer</h3>
          <h1>
            {
              topPerformer
                ? topPerformer.username
                : "-"
            }
          </h1>
        </div>

  </div>

      <div className="charts-grid">

        <div className="chart-box">

          <h2>
            Student Scores
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart data={scoreChartData}>

  <CartesianGrid
    strokeDasharray="3 3"
    stroke={
      isDark
        ? "#475569"
        : "#e2e8f0"
    }
  />

  <XAxis
    dataKey="name"
    tick={{
      fill: isDark
        ? "#f8fafc"
        : "#111827"
    }}
  />

  <YAxis
    tick={{
      fill: isDark
        ? "#f8fafc"
        : "#111827"
    }}
  />

  <Tooltip />

  <Bar
    dataKey="score"
    fill="#3b82f6"
  />

</BarChart>

          </ResponsiveContainer>

        </div>

    <div className="chart-box">

  <h2>
    Performance Distribution
  </h2>

  <ResponsiveContainer
    width="100%"
    height={350}
  >

    <PieChart>

      <Pie
        data={performanceData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="45%"
        outerRadius={110}
        innerRadius={50}
        paddingAngle={5}
      >

        {performanceData.map(
          (entry, index) => (

            <Cell
              key={index}
              fill={
                COLORS[
                  index %
                  COLORS.length
                ]
              }
            />

          )
        )}

      </Pie>

      <Legend
        verticalAlign="bottom"
        align="center"
      />

      <Tooltip
        formatter={(value) => [
          `${value} Students`,
          "Count"
        ]}
      />

    </PieChart>

  </ResponsiveContainer>

</div>

        <div className="chart-box full-width">

          <h2>
            Score Trend
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <LineChart data={scoreChartData}>

  <CartesianGrid
    strokeDasharray="3 3"
    stroke={
      isDark
        ? "#475569"
        : "#e2e8f0"
    }
  />

  <XAxis
    dataKey="name"
    tick={{
      fill: isDark
        ? "#f8fafc"
        : "#111827"
    }}
  />

  <YAxis
    tick={{
      fill: isDark
        ? "#f8fafc"
        : "#111827"
    }}
  />

  <Tooltip />

  <Line
    type="monotone"
    dataKey="score"
    stroke="#8b5cf6"
    strokeWidth={3}
  />

</LineChart>

          </ResponsiveContainer>

        </div>

      </div>

    </AdminLayout>
  );
};

export default Analytics;