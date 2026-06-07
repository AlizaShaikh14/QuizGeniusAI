
import {
  Link,
  useLocation
} from "react-router-dom";

const Sidebar = ({ role }) => {

  console.log("Sidebar Role:", role);

  const location = useLocation();

  return (

    <div className="sidebar">

      {/* LOGO */}

      <h1 className="logo">
        QuizGeniusAI
      </h1>

      {/* MENU */}

      <div className="menu">

        {/* ADMIN MENU */}

       {
  role?.toUpperCase() === "ADMIN" && (
    <>
      <Link
        to="/admin"
        className={
          location.pathname === "/admin"
            ? "active"
            : ""
        }
      >
        📊 Dashboard
      </Link>

      <Link
        to="/generate-quiz"
        className={
          location.pathname === "/generate-quiz"
            ? "active"
            : ""
        }
      >
        🤖 Generate Quiz
      </Link>

      <Link
        to="/analytics"
        className={
          location.pathname === "/analytics"
            ? "active"
            : ""
        }
      >
        📈 Analytics
      </Link>

      <Link
        to="/leaderboard"
        className={
          location.pathname === "/leaderboard"
            ? "active"
            : ""
        }
      >
        🏆 Leaderboard
      </Link>

      <Link
        to="/profile"
        className={
          location.pathname === "/profile"
            ? "active"
            : ""
        }
      >
        👤 Profile
      </Link>
    </>
  )
}

        {/* USER MENU */}

        {
          role?.toUpperCase() === "USER" && (
            <>

              <Link
                to="/user"
                className={
                  location.pathname === "/user"
                    ? "active"
                    : ""
                }
              >
                🏠 Dashboard
              </Link>

              <Link
                to="/my-quizzes"
                className={
                  location.pathname === "/my-quizzes"
                    ? "active"
                    : ""
                }
              >
                📝 My Quizzes
              </Link>

              <Link
                to="/results"
                className={
                  location.pathname === "/results"
                    ? "active"
                    : ""
                }
              >
                📄 Results
              </Link>

              <Link
                to="/leaderboard"
                className={
                  location.pathname === "/leaderboard"
                    ? "active"
                    : ""
                }
              >
                🏆 Leaderboard
              </Link>

              <Link
                to="/profile"
                className={
                  location.pathname === "/profile"
                    ? "active"
                    : ""
                }
              >
                👤 Profile
              </Link>

            </>
          )
        }

      </div>

      {/* LOGOUT */}

      <button
        className="logout-btn"
        onClick={() => {

          localStorage.clear();

          window.location.href = "/";
        }}
      >
        🚪 Logout
      </button>

    </div>
  );
};

export default Sidebar;