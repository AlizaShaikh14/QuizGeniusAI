import { useEffect, useState } from "react";

import API from "../services/api";

import UserLayout from "../layout/UserLayout";

import Navbar from "../components/Navbar";

import "../styles/userDashboard.css";

const UserDashboard = () => {

  const [quizzes, setQuizzes] =
    useState([]);

  useEffect(() => {

    fetchQuizzes();

  }, []);

  const fetchQuizzes =
    async () => {

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

  return (

    <UserLayout>

      <Navbar
        title="Welcome Back 👋"
        subtitle="Attempt AI Generated Quizzes"
      />

      {/* STATS */}

      <div className="user-stats">

        <div className="user-card">

          <h3>
            📚 Total Quizzes
          </h3>

          <h1>
            {quizzes.length}
          </h1>

        </div>

        <div className="user-card">

          <h3>
            🏆 Highest Score
          </h3>

          <h1>
            95%
          </h1>

        </div>

        <div className="user-card">

          <h3>
            ⚡ AI Powered
          </h3>

          <h1>
            QuizGenius
          </h1>

        </div>

      </div>

      {/* QUIZZES */}

      <div className="user-quiz-grid">

        {
          quizzes.map((quiz) => (

            <div
              key={quiz.id}
              className="user-quiz-card"
            >

              <h2 className="quiz-title">
                {quiz.title}
              </h2>

              <p className="quiz-info">
                📘 Topic:
                {" "}
                {quiz.topic}
              </p>

              <p className="quiz-info">
                ⚡ Difficulty:
                {" "}
                {quiz.difficulty}
              </p>

              <p className="quiz-info">
                ❓ Questions:
                {" "}
                {
                  quiz.questions
                    ? quiz.questions.length
                    : 0
                }
              </p>

              {
                quiz.questions &&
                quiz.questions.length > 0 && (

                  <div className="question-preview">

                    <h3>
                      Sample Question
                    </h3>

                    <p>
                      {
                        quiz.questions[0]
                          .questionText
                      }
                    </p>

                  </div>

                )
              }

              <button
                className="user-btn"
                onClick={() => {

                  window.location.href =
                    `/quiz/${quiz.id}`;

                }}
              >

                Attempt Quiz 🚀

              </button>

            </div>

          ))
        }

      </div>

    </UserLayout>

  );
};

export default UserDashboard;