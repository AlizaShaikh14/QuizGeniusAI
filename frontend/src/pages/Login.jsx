import "../styles/login.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [role, setRole] =
    useState("USER");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response =
        await API.post(
          "/auth/login",
          {
            email,
            password
          }
        );

      localStorage.setItem(
        "username",
        response.data.username
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      if (
        response.data.role === "ADMIN"
      ) {

        navigate("/admin");

      } else {

        navigate("/user");
      }

    } catch (error) {

      console.log(error);

      alert(
        "Invalid Credentials"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="login-page">

      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>

      {/* LEFT SECTION */}

      <div className="login-left">

        <h1>
          QuizGeniusAI
        </h1>

        <h2>
          Smart Quizzes.
          <br />
          Better Learning.
        </h2>

        <p>
          Create, attempt and analyze quizzes
          with real-time performance tracking,
          leaderboards and AI-powered
          assessments.
        </p>

      </div>

      {/* RIGHT SECTION */}

      <div className="login-right">

        <div className="login-card">

          <h1 className="login-logo">
            Welcome Back !
          </h1>

          <p className="login-subtitle">
            Log in to continue
          </p>

          <form
            onSubmit={handleLogin}
          >

            <label>
              Login As
            </label>

            <select
              className="login-input"
              value={role}
              onChange={(e) =>
                setRole(
                  e.target.value
                )
              }
            >

              <option value="USER">
                User
              </option>

              <option value="ADMIN">
                Admin
              </option>

            </select>

            <label>
              Email
            </label>

            <input
              className="login-input"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              required
            />

            <label>
              Password
            </label>

            <div className="password-box">

              <input
                className="login-input"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter Password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
              />

              <button
  type="button"
  className="eye-btn"
  onClick={() =>
    setShowPassword(!showPassword)
  }
>
  {showPassword ? "Hide" : "Show"}
</button>

            </div>

            <div className="remember-box">

              <input
                type="checkbox"
              />

              <span>
                Remember Me
              </span>

            </div>

            <button
              type="submit"
              className="login-btn"
            >

              {
                loading
                  ? "Signing In..."
                  : "Login"
              }

            </button>

          </form>

          <p className="register-text">

            Don't have an account?

            <Link to="/register">

              Register

            </Link>

          </p>

          <div className="login-footer">

            © 2026 QuizGeniusAI

          </div>

        </div>

      </div>

    </div>

  );
};

export default Login;