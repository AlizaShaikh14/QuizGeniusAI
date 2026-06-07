import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import UserLayout from "../layout/UserLayout";
import Navbar from "../components/Navbar";
import "../styles/quizPage.css";

const QuizPage = () => {

  const { id } = useParams();

  const [quiz, setQuiz] = useState(null);

  const [selectedAnswers, setSelectedAnswers] =
    useState({});

  const [score, setScore] =
    useState(null);

  const [timeLeft, setTimeLeft] =
    useState(300); // 5 Minutes

  useEffect(() => {

    fetchQuiz();

  }, []);

  useEffect(() => {

    if (!quiz || score !== null)
      return;

    if (timeLeft === 0) {

      handleSubmit();
      return;

    }

    const timer = setInterval(() => {

      setTimeLeft(
        prev => prev - 1
      );

    }, 1000);

    return () =>
      clearInterval(timer);

  }, [
    timeLeft,
    quiz,
    score
  ]);

  const fetchQuiz =
    async () => {

      try {

        const response =
          await API.get(
            `/quiz/${id}`
          );

        setQuiz(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  const handleOptionClick =
    (
      questionIndex,
      option
    ) => {

      if (score !== null)
        return;

      setSelectedAnswers({

        ...selectedAnswers,

        [questionIndex]:
          option,
      });
    };

  const handleSubmit =
    async () => {

      if (
        !quiz ||
        score !== null
      )
        return;

      let total = 0;

      quiz.questions.forEach(
        (q, index) => {

          if (

            selectedAnswers[
              index
            ] ===
            q.correctAnswer

          ) {

            total++;
          }
        }
      );

      setScore(total);

      try {

        await API.post(
  "/result",
  {

    username:
      localStorage.getItem(
        "username"
      ),

    quizTitle:
      quiz.title,

    topic:
      quiz.topic,

    score:
      total,

    totalQuestions:
      quiz.questions.length,

    timeTaken:
      300 - timeLeft

  }
);

        console.log(
          "Result Saved Successfully"
        );

      } catch (error) {

        console.log(
          "Save Error:",
          error
        );
      }
    };

  if (!quiz) {

    return (

      <UserLayout>

        <div className="quiz-loading">

          Loading Quiz...

        </div>

      </UserLayout>
    );
  }

  return (

    <UserLayout>

      <Navbar
        title="Quiz Attempt"
        subtitle="Answer all questions carefully"
      />

      <div className="quiz-container">

        <div className="quiz-header">

          <h1>
            {quiz.title}
          </h1>

          <div className="quiz-info">

            <span>
              📚 {quiz.topic}
            </span>

            <span>
              🎯 {quiz.difficulty}
            </span>

            <span>
              ❓ {
                quiz.questions.length
              } Questions
            </span>

          </div>

          <div className="timer-box">

            ⏰ Time Left :
            {" "}
            {
              Math.floor(
                timeLeft / 60
              )
            }
            :
            {
              (timeLeft % 60)
                .toString()
                .padStart(2, "0")
            }

          </div>

        </div>

        {

          quiz.questions.map(

            (q, index) => (

              <div
                key={index}
                className="question-card"
              >

                <h2>

                  Question
                  {" "}
                  {index + 1}

                </h2>

                <p className="question-text">

                  {q.questionText}

                </p>

                <div className="options-container">

                  {[
                    q.option1,
                    q.option2,
                    q.option3,
                    q.option4,
                  ].map(

                    (
                      option,
                      i
                    ) => (

                      <button

                        key={i}

                        disabled={
                          score !== null
                        }

                        className={`option-btn ${
                          selectedAnswers[
                            index
                          ] === option
                            ? "selected-option"
                            : ""
                        }`}

                        onClick={() =>
                          handleOptionClick(
                            index,
                            option
                          )
                        }
                      >

                        {option}

                      </button>
                    )
                  )}

                </div>

                {

                  score !==
                    null && (

                    <div className="answer-review">

                      {

                        selectedAnswers[
                          index
                        ] ===
                        q.correctAnswer

                        ?

                        (

                          <p className="correct-msg">

                            ✅ Correct Answer

                          </p>

                        )

                        :

                        (

                          <>

                            <p className="wrong-msg">

                              ❌ Your Answer :
                              {" "}
                              {
                                selectedAnswers[
                                  index
                                ] ||
                                "Not Answered"
                              }

                            </p>

                            <p className="correct-msg">

                              ✅ Correct Answer :
                              {" "}
                              {
                                q.correctAnswer
                              }

                            </p>

                          </>

                        )
                      }

                    </div>
                  )
                }

              </div>
            )
          )
        }

        {

          score === null && (

            <button
              className="submit-btn"
              onClick={
                handleSubmit
              }
            >

              Submit Quiz

            </button>

          )
        }

        {

          score !== null && (

            <div className="score-card">

              <h1>

                🎉 Quiz Completed!

              </h1>

              <h2>

                {score}
                {" / "}
                {
                  quiz.questions.length
                }

              </h2>

              <p>

                Accuracy :
                {" "}

                {
                  Math.round(
                    (
                      score /
                      quiz
                        .questions
                        .length
                    ) * 100
                  )
                }
                %

              </p>

              <p>

                ⏱ Time Taken :
                {" "}
                {
                  300 -
                  timeLeft
                }
                s

              </p>

            </div>
          )
        }

      </div>

    </UserLayout>
  );
};

export default QuizPage;