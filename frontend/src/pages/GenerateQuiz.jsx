
import { useState } from "react";

import API from "../services/api";

import AdminLayout from "../layout/AdminLayout";

import Navbar from "../components/Navbar";

import "../styles/generateQuiz.css";

const GenerateQuiz = () => {

  const [topic, setTopic] =
    useState("");

  const [difficulty,
    setDifficulty] =
    useState("Easy");

  const [numberOfQuestions,
    setNumberOfQuestions] =
    useState(5);

  const [loading,
    setLoading] =
    useState(false);

  const handleGenerate =
    async () => {

      try {

        setLoading(true);

        await API.post(
          "/ai/generate",
          {
            topic,
            difficulty,
            numberOfQuestions
          }
        );

        alert(
          "AI Quiz Generated Successfully 🚀"
        );

        setTopic("");
        setDifficulty("Easy");
        setNumberOfQuestions(5);

      } catch (error) {

        console.log(error);

        alert(
          "Error generating AI quiz"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <AdminLayout>

      <Navbar
        title="Generate AI Quiz"
        subtitle="Create quizzes using Artificial Intelligence"
      />

      <div className="generate-page">

        <div className="generate-card">

          <label>
            Quiz Topic
          </label>

          <input
            className="generate-input"
            type="text"
            placeholder="Enter Topic"
            value={topic}
            onChange={(e) =>
              setTopic(
                e.target.value
              )
            }
          />

          <label>
            Difficulty
          </label>

          <select
            className="generate-input"
            value={difficulty}
            onChange={(e) =>
              setDifficulty(
                e.target.value
              )
            }
          >

            <option value="Easy">
              Easy
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Hard">
              Hard
            </option>

          </select>

          <label>
            Number Of Questions
          </label>

          <input
            className="generate-input"
            type="number"
            min="1"
            max="20"
            value={numberOfQuestions}
            onChange={(e) =>
              setNumberOfQuestions(
                e.target.value
              )
            }
          />

          <button
            className="generate-btn"
            onClick={handleGenerate}
          >

            {
              loading
                ? "Generating..."
                : "Generate AI Quiz 🚀"
            }

          </button>

        </div>

      </div>

    </AdminLayout>
  );
};

export default GenerateQuiz;
