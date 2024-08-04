import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Result from "./Result";
const Question = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showResult, setShowResult] = useState(false);
  const totalAnswered = correctAnswers + incorrectAnswers;

  const savedProgress = localStorage.getItem("quizProgress");
  const getQuestions = async () => {
    try {
      const response = await axios.get(
        "https://opentdb.com/api.php?amount=5&difficulty=medium&type=boolean"
      );

      setQuestions(response.data.results);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setQuestions(progress.questions);
      setTimeLeft(progress.timeLeft);
      setCurrentQuestionIndex(progress.currentQuestionIndex);
      setCorrectAnswers(progress.correctAnswers);
      setIncorrectAnswers(progress.incorrectAnswers);
    } else {
      getQuestions();
    }
  }, []);

  useEffect(() => {
    const progress = {
      questions,
      timeLeft,
      currentQuestionIndex,
      correctAnswers,
      incorrectAnswers,
    };
    localStorage.setItem("quizProgress", JSON.stringify(progress));
  }, [
    currentQuestionIndex,
    correctAnswers,
    incorrectAnswers,
    timeLeft,
    questions,
  ]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestartQuiz = () => {
    localStorage.removeItem("quizProgress");
    setTimeLeft(60);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setShowResult(false);
    getQuestions();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => (prevTimeLeft > 0 ? prevTimeLeft - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      {!showResult && timeLeft > 0 && questions.length > 0 && (
        <>
          <p className="font-bold">Time : {timeLeft} s</p>
          <h1>Questions :</h1>
          <h2>
            {currentQuestionIndex + 1} / {questions.length}
          </h2>

          <div className="mt-5" key={currentQuestionIndex}>
            <p>{questions[currentQuestionIndex].question}</p>
            <div className="flex justify-center space-x-5">
              <button
                className="btn rounded-lg bg-sky-500 px-4 py-2 hover:bg-gray-300"
                onClick={() => handleAnswerSelect("True")}
                disabled={selectedAnswer !== null}
              >
                True
              </button>
              <button
                className="btn rounded-lg bg-sky-500 px-4 py-2 hover:bg-gray-300"
                onClick={() => handleAnswerSelect("False")}
                disabled={selectedAnswer !== null}
              >
                False
              </button>
            </div>
          </div>
        </>
      )}
      {(showResult || timeLeft <= 0) && (
        <>
          <Result
            correctAnswers={correctAnswers}
            incorrectAnswers={incorrectAnswers}
            totalAnswered={totalAnswered}
          />
          <button
            className="btn rounded-lg bg-sky-500 px-4 py-2 mt-4 hover:bg-gray-300"
            onClick={handleRestartQuiz}
          >
            Restart Quiz
          </button>
        </>
      )}
    </div>
  );
};

export default Question;
