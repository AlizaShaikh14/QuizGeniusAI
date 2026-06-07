import {

  BrowserRouter,
  Routes,
  Route

} from "react-router-dom";

import Login from "./pages/Login";

import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";

import UserDashboard from "./pages/UserDashboard";

import GenerateQuiz from "./pages/GenerateQuiz";

import Analytics from "./pages/Analytics";

import Leaderboard from "./pages/Leaderboard";

import QuizPage from "./pages/QuizPage";

import MyQuizzes from "./pages/MyQuizzes";

import Results from "./pages/Results";

import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route
          path="/"
          element={<Login />}
        />

        {/* REGISTER */}

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ADMIN */}

        <Route
          path="/admin"
          element={

            <ProtectedRoute role="ADMIN">

              <AdminDashboard />

            </ProtectedRoute>
          }
        />

        {/* GENERATE QUIZ */}

        <Route
          path="/generate-quiz"
          element={

            <ProtectedRoute role="ADMIN">

              <GenerateQuiz />

            </ProtectedRoute>
          }
        />

        {/* ANALYTICS */}

        <Route
          path="/analytics"
          element={

            <ProtectedRoute role="ADMIN">

              <Analytics />

            </ProtectedRoute>
          }
        />

        {/* USER */}

        <Route
          path="/user"
          element={

            <ProtectedRoute role="USER">

              <UserDashboard />

            </ProtectedRoute>
          }
        />

        {/* MY QUIZZES */}

        <Route
          path="/my-quizzes"
          element={

            <ProtectedRoute role="USER">

              <MyQuizzes />

            </ProtectedRoute>
          }
        />

        {/* QUIZ PAGE */}

        <Route
          path="/quiz/:id"
          element={

            <ProtectedRoute role="USER">

              <QuizPage />

            </ProtectedRoute>
          }
        />

        {/* RESULTS */}

        <Route
  path="/results"
  element={
    <ProtectedRoute>
      <Results />
    </ProtectedRoute>
  }
/>

        {/* PROFILE */}

        <Route
  path="/profile"
  element={

    <ProtectedRoute>

      <Profile />

            </ProtectedRoute>
          }
        />

        {/* LEADERBOARD */}

        <Route
          path="/leaderboard"
          element={

            <ProtectedRoute>

              <Leaderboard />

            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;