import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "../styles/register.css";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
        role: "USER",
      });

      alert("Registered Successfully 🚀");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <div className="register-header">
          <h1>Create Account</h1>
          <p>Join QuizGeniusAI</p>
        </div>

        <form
          onSubmit={handleRegister}
          className="register-form"
        >

          <label>Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="submit"
            className="register-btn"
          >
            Register
          </button>

        </form>

        <p className="login-link-text">
          Already have an account?

          <Link
            to="/"
            className="login-link"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;