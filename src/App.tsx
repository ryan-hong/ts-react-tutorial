import React, { useState } from "react";
import QuestionCard from "./components/questionCard";
import { fetchQuizQuestions, Difficulty, QuestionState } from "./API";
import { GlobalStyle, Wrapper } from "./App.styles";

export interface AnswerObject {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAns, setUserAns] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions);

  const startTrivia = async () => {
    // start button triggers API fetch
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAns([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // users answer
      const answer = e.currentTarget.value;
      // check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // add score if answer is correct
      if (correct) {
        setScore((prev) => prev + 1);
      }
      // save answer in the array for user answer
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAns((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // move on to next question if not last question
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <Wrapper>
          <h1>REACT QUIZ</h1>
          {/* if game over or user answered all questions display start button */}
          {gameOver || userAns.length === TOTAL_QUESTIONS ? (
            <button className="start" onClick={startTrivia}>
              Start
            </button>
          ) : null}

          {!gameOver ? <p className="score">Score: {score} </p> : null}
          {loading && <p>Loading Questions...</p>}

          {!loading && !gameOver && (
            <QuestionCard
              qNum={number + 1}
              totalQs={TOTAL_QUESTIONS}
              question={questions[number].question}
              answers={questions[number].answer}
              userAns={userAns ? userAns[number] : undefined}
              callback={checkAnswer}
            />
          )}

          {!loading &&
          !gameOver &&
          userAns.length === number + 1 &&
          number !== TOTAL_QUESTIONS - 1 ? (
            <button className="next" onClick={nextQuestion}>
              Next Question
            </button>
          ) : null}
        </Wrapper>
      </div>
    </>
  );
}

export default App;
