import { useNavigate } from "react-router-dom";

const QuizCard = ({ quiz }) => {

  const navigate = useNavigate();

  return (
    <div className="quiz-card">

      <h2>{quiz.title}</h2>

      <p>📘 Topic: {quiz.topic}</p>

      <p>⚡ Difficulty: {quiz.difficulty}</p>

      <br />

      <button
        className="btn"
        onClick={() => navigate(`/quiz/${quiz.id}`)}
      >
        Attempt Quiz
      </button>

    </div>
  );
};

export default QuizCard;