import {
  useEffect,
  useState
} from "react";

import API from "../services/api";

import AdminLayout from "../layout/AdminLayout";
import UserLayout from "../layout/UserLayout";

import Navbar from "../components/Navbar";

import "../styles/leaderboard.css";

const Leaderboard = () => {

  const [users, setUsers] =
    useState([]);

  const role =
    localStorage.getItem("role");

  const Layout =
    role?.toUpperCase() === "ADMIN"
      ? AdminLayout
      : UserLayout;

  useEffect(() => {

    fetchLeaderboard();

  }, []);

  const fetchLeaderboard =
    async () => {

      try {

        const response =
          await API.get(
            "/result/leaderboard"
          );

        setUsers(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <Layout>

      <Navbar
        title="Leaderboard"
        subtitle="Top Quiz Performers"
      />

      <div className="leaderboard-container">

        <div className="leaderboard-header">

          <h1>
            🏆 Leaderboard
          </h1>

          <p>
            Top Quiz Performers
          </p>

        </div>

        {
          users.length === 0 ? (

            <div className="empty-board">

              <h2>
                No Leaderboard Data Found
              </h2>

              <p>
                Attempt quizzes first.
              </p>

            </div>

          ) : (

            <>
              <div className="leaderboard-top">

                {
                  users
                    .slice(0, 3)
                    .map(
                      (
                        user,
                        index
                      ) => (

                        <div
                          key={index}
                          className={`leader-card ${
                            index === 0
                              ? "gold"
                              : index === 1
                              ? "silver"
                              : "bronze"
                          }`}
                        >

                          <h1>

                            {
                              index === 0
                                ? "🥇"
                                : index === 1
                                ? "🥈"
                                : "🥉"
                            }

                          </h1>

                          <h2>
                            {user.username}
                          </h2>

                          <p>
                            Score: {user.score}
                          </p>

                        </div>
                      )
                    )
                }

              </div>

              <div className="rank-list">

                {
                  users.map(
                    (
                      user,
                      index
                    ) => (

                      <div
                        key={index}
                        className="rank-item"
                      >

                        <div>

                          <h3>

                            {
                              index === 0
                                ? "🥇 Rank #1"
                                : index === 1
                                ? "🥈 Rank #2"
                                : index === 2
                                ? "🥉 Rank #3"
                                : `🏅 Rank #${index + 1}`
                            }

                          </h3>

                          <p>
                            {user.username}
                          </p>

                        </div>

                        <div
                          className="rank-score"
                        >

                          {user.score}

                        </div>

                      </div>
                    )
                  )
                }

              </div>

            </>
          )
        }

      </div>

    </Layout>
  );
};

export default Leaderboard;