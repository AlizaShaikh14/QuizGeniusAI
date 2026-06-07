
import { useEffect, useState } from "react";
import API from "../services/api";
import AdminLayout from "../layout/AdminLayout";
import Navbar from "../components/Navbar";
import "../styles/adminDashboard.css";

const AdminDashboard = () => {

  const [results, setResults] =
  useState([]);

  const [quizzes, setQuizzes] =
    useState([]);

  useEffect(() => {

  fetchQuizzes();
  fetchResults();

}, []);
  const fetchQuizzes = async () => {

    try {

      const response =
        await API.get(
          "/quiz/all"
        );

      setQuizzes(
        response.data
      );

    } catch (error) {

      console.log(error);
    }
  };

  const fetchResults = async () => {

  try {

    const response =
      await API.get("/result");

    setResults(response.data);

  } catch (error) {

    console.log(error);
  }
};

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this quiz?"
        );

      if (!confirmDelete)
        return;

      try {

        await API.delete(
          `/quiz/${id}`
        );

        alert(
          "Quiz Deleted Successfully ✅"
        );

        setQuizzes(
          quizzes.filter(
            (quiz) =>
              quiz.id !== id
          )
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to delete quiz ❌"
        );
      }
    };

    const totalUsers =
  [...new Set(
    results.map(
      r => r.username
    )
  )].length;

  return (

    <AdminLayout>

      <Navbar
        title="Welcome Admin 👑"
        subtitle="Manage quizzes and analytics"
      />

      <div className="stats-grid">

        <div className="stats-card">
          <h3>📚 Total Quizzes</h3>
          <h1>{quizzes.length}</h1>
        </div>

        <div className="stats-card">
  <h3>👥 Total Users</h3>
  <h1>{totalUsers}</h1>
</div>

<div className="stats-card">
  <h3>🏆 Attempts</h3>
  <h1>{results.length}</h1>
</div>

      </div>

      <div className="admin-section">

        <h2 className="section-title">
          Generated Quizzes
        </h2>

        <div className="quiz-grid">

          {quizzes.map(
            (quiz) => (

              <div
                key={quiz.id}
                className="quiz-card"
              >

                <h2>
                  {quiz.title}
                </h2>

                <p>
                  📘 Topic:
                  {" "}
                  {quiz.topic}
                </p>

                <p>
                  ⚡ Difficulty:
                  {" "}
                  {quiz.difficulty}
                </p>

                <p>
                  ❓ Questions:
                  {" "}
                  {quiz.questions?.length || 0}
                </p>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(
                      quiz.id
                    )
                  }
                >
                  🗑️ Delete Quiz
                </button>

              </div>
            )
          )}

        </div>

      </div>

    </AdminLayout>
  );
};

export default AdminDashboard;
