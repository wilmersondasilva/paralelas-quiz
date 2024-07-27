import { useEffect, useState, KeyboardEvent } from "react";
import data from "./assets/quiz1.json";
import "./App.css";
import { Question as QuestionInterface } from "./types";
import Question from "./Question";
import Answer from "./Answer";

function App() {
  const numberOfQuestions = data.length;
  const [quizData, setQuizData] = useState(data);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isAnswerTime, setIsAnswerTime] = useState(false);
  const [counter, setCounter] = useState(quizData[currentQuestion].duration);

  const nextAnswer = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const previousAnswer = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    console.log("event.key", event.key);

    if (event.key === "ArrowRight") {
      if (currentQuestion < numberOfQuestions - 1) {
        nextAnswer();
      }
    } else if (event.key === "ArrowLeft") {
      if (currentQuestion > 0) {
        previousAnswer();
      }
    }
  };

  useEffect(() => {
    if (!isAnswerTime) {
      if (counter > 0) {
        const timer = setInterval(
          () => setCounter((counter) => counter - 1),
          1000
        );

        return () => clearInterval(timer);
      } else if (counter === 0) {
        if (currentQuestion === numberOfQuestions - 1) {
          setIsAnswerTime(true);
          setCurrentQuestion(0);
        } else {
          setCurrentQuestion(currentQuestion + 1);
          setCounter(quizData[currentQuestion + 1].duration);
        }
      }
    }
  }, [counter, quizData, currentQuestion, isAnswerTime, numberOfQuestions]);

  return (
    <div className="w-screen flex justify-center" onKeyDown={handleKeyDown}>
      {isAnswerTime ? (
        <Answer
          question={quizData[currentQuestion] as QuestionInterface}
          index={currentQuestion + 1}
          nextAnswer={nextAnswer}
          previousAnswer={previousAnswer}
        />
      ) : (
        <>
          <Question
            question={quizData[currentQuestion] as QuestionInterface}
            index={currentQuestion + 1}
            counter={counter}
          />
        </>
      )}
    </div>
  );
}

export default App;
