import { useEffect, useState } from "react";

import API from "../services/api";

import UserLayout from "../layout/UserLayout";

import Navbar from "../components/Navbar";

import "../styles/results.css";

const Results = () => {

  const [results, setResults] =
    useState([]);

  useEffect(() => {

    fetchResults();

  }, []);

  const fetchResults =
    async () => {

      try {

        const response =
          await API.get("/result");

        const username =
          localStorage.getItem(
            "username"
          );

        const filtered =
          response.data.filter(
            item =>
              item.username ===
              username
          );

        setResults(filtered);

      } catch (error) {

        console.log(error);
      }
    };

  const bestScore =
    results.length > 0
      ? Math.max(
          ...results.map(
            r => r.score
          )
        )
      : 0;

  const averageScore =
    results.length > 0
      ? (
          results.reduce(
            (a, b) =>
              a + b.score,
            0
          ) / results.length
        ).toFixed(1)
      : 0;

  return (

    <UserLayout>

      <Navbar
        title="My Results"
        subtitle="Track your quiz performance"
      />

      <div className="result-stats">

        <div className="result-stat-card">

          <h3>
            Attempts
          </h3>

          <h1>
            {results.length}
          </h1>

        </div>

        <div className="result-stat-card">

          <h3>
            Best Score
          </h3>

          <h1>
            {bestScore}
          </h1>

        </div>

        <div className="result-stat-card">

          <h3>
            Average Score
          </h3>

          <h1>
            {averageScore}
          </h1>

        </div>

      </div>

      <div className="result-grid">

        {
          results.length === 0 ?

          (

            <div className="result-card">

              <h2>
                No Results Found
              </h2>

              <p>
                Attempt a quiz first.
              </p>

            </div>

          )

          :

          (

            results.map(
              (
                item,
                index
              ) => {

                const percentage =
                  Math.round(
                    (
                      item.score /
                      item.totalQuestions
                    ) * 100
                  );

                return (

                  <div
                    key={index}
                    className="result-card"
                  >

                    <h2>
                      Attempt #
                      {index + 1}
                    </h2>

                    <h1>
                      🎯 {item.score}
                      /
                      {
                        item.totalQuestions
                      }
                    </h1>

                    <div
                      className="progress"
                    >

                      <div
                        className="progress-fill"
                        style={{
                          width:
                            `${percentage}%`
                        }}
                      />

                    </div>

                    <p>
                      Score:
                      {" "}
                      {percentage}%
                    </p>

                    <p>
                      ⏱ Time:
                      {" "}
                      {item.timeTaken}s
                    </p>

                    <p>
                      {
                        percentage >= 80
                        ? "🏆 Excellent"
                        : percentage >= 50
                        ? "👍 Good"
                        : "📚 Needs Improvement"
                      }
                    </p>

                  </div>
                );
              }
            )
          )
        }

      </div>

    </UserLayout>

  );
};

export default Results;