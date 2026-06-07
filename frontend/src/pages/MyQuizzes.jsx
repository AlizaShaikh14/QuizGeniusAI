import { useEffect, useState } from "react";
import API from "../services/api";
import UserLayout from "../layout/UserLayout";
import Navbar from "../components/Navbar";
import "../styles/myQuizzes.css";

const MyQuizzes = () => {

  const [quizzes, setQuizzes] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {

    try {

      const response =
        await API.get("/result");

      const username =
        localStorage.getItem("username");

      const filtered =
        response.data.filter(
          item =>
            item.username === username
        );

      setQuizzes(filtered);

    } catch (error) {

      console.log(error);
    }
  };

  const filteredQuizzes =
    quizzes.filter((quiz) =>
      (quiz.quizTitle || "")
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const totalAttempts =
    quizzes.length;

  const highestScore =
    quizzes.length > 0
      ? Math.max(
          ...quizzes.map(
            q => q.score
          )
        )
      : 0;

  const avgScore =
    quizzes.length > 0
      ? (
          quizzes.reduce(
            (sum, q) =>
              sum + q.score,
            0
          ) / quizzes.length
        ).toFixed(1)
      : 0;

  return (

    <UserLayout>

      <Navbar
        title="My Quizzes"
        subtitle="Your completed quiz history"
      />

      {/* STATS */}

      <div className="quiz-stats">

        <div className="stat-card">
          <h3>Total Attempts</h3>
          <h1>{totalAttempts}</h1>
        </div>

        <div className="stat-card">
          <h3>Highest Score</h3>
          <h1>{highestScore}</h1>
        </div>

        <div className="stat-card">
          <h3>Average Score</h3>
          <h1>{avgScore}</h1>
        </div>

      </div>

      {/* SEARCH */}

      <input
        type="text"
        className="search-box"
        placeholder="🔍 Search Quiz..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
      />

      <div className="myquiz-grid">

        {
          filteredQuizzes.length === 0 ? (

            <div className="empty-card">

              <h2>
                No Quiz Found
              </h2>

              <p>
                Try another search
                or attempt a quiz.
              </p>

            </div>

          ) : (

            filteredQuizzes.map(
              (quiz, index) => (

                <div
                  key={index}
                  className="myquiz-card"
                >

                  <div className="quiz-badge">
                    Completed
                  </div>

                  <h2>
                    {
                      quiz.quizTitle ||
                      `Quiz #${index + 1}`
                    }
                  </h2>

                  <p>
                    🎯 Score:
                    {" "}
                    {quiz.score}
                    /
                    {quiz.totalQuestions}
                  </p>

                  <p>
                    ⏱ Time:
                    {" "}
                    {quiz.timeTaken}s
                  </p>

                  <div className="progress">

                    <div
                      className="progress-fill"
                      style={{
                        width:
                          `${
                            (
                              quiz.score /
                              quiz.totalQuestions
                            ) * 100
                          }%`
                      }}
                    ></div>

                  </div>

                  <p className="accuracy">

                    Accuracy:
                    {" "}
                    {Math.round(
                      (
                        quiz.score /
                        quiz.totalQuestions
                      ) * 100
                    )}
                    %

                  </p>

                </div>
              )
            )

          )
        }

      </div>

    </UserLayout>
  );
};

export default MyQuizzes;