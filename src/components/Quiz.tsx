import React, { useEffect, useState } from "react";
import Question from "./Question";
import { fetchQuizQuestions, QuestionsType } from "../api/quiz-api";

interface Props {
  onGameOver: (score: number) => void;
}

const Quiz: React.FC<Props> = ({ onGameOver }) => {
  const [questions, setQuestions] = useState<QuestionsType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [playerAnswers, setPlayerAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function getQuestions() {
      let questions = await fetchQuizQuestions();
      console.log(questions);
      setQuestions(questions);
    }
    getQuestions();
  }, []);

  const nextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) return gameOver();
    if (isCorrectAnswer()) setScore((score) => score + 1);
    setCurrentQuestionIndex((curr) => curr + 1);
  };

  const isCorrectAnswer = () => {
    let correctAnswer = questions[currentQuestionIndex].correct_answer;
    let userAnswer = playerAnswers[currentQuestionIndex];
    return correctAnswer === userAnswer;
  };

  const handleAnswersSelection = (answer: string) => {
    const _playerAnswers = [...playerAnswers];
    _playerAnswers[currentQuestionIndex] = answer;
    setPlayerAnswers(_playerAnswers);
  };

  const gameOver = () => {
    let finalScore: number = isCorrectAnswer() ? score + 1 : score;
    onGameOver(finalScore);
  };

  if (!questions.length) return <p className="text-center">Loading...</p>;

  return (
    <>
      <h6 className="text-base font-bold mb-4">
        Question {currentQuestionIndex + 1} of {questions.length}
      </h6>
      {questions.length && (
        <Question
          playerAnswer={playerAnswers[currentQuestionIndex]}
          {...questions[currentQuestionIndex]}
          onAnswerSelection={handleAnswersSelection}
        />
      )}
      <button
        onClick={nextQuestion}
        className="h-12 bg-blue-500 text-white rounded float-right pl-6 pr-6"
      >
        Next
      </button>
    </>
  );
};

export default Quiz;
