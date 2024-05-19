import { useEffect, useState } from "react";
import data from "./assets/quiz.json";
import "./App.css";
import { QuestionInterface } from "./types";
import Question from "./Question";

function App() {
  const numberOfQuestions = data.length;
  const [quizData, setQuizData] = useState(data);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isAnswerTime, setIsAnswerTime] = useState(false);
  const [counter, setCounter] = useState(quizData[currentQuestion].duration);

  useEffect(() => {
    if (counter > 0) {
      const timer = setInterval(
        () => setCounter((counter) => counter - 1),
        1000
      );

      return () => clearInterval(timer);
    } else if (counter === 0) {
      if (currentQuestion === numberOfQuestions - 1) {
        setIsAnswerTime(true);
      } else {
        setCurrentQuestion(currentQuestion + 1);
        setCounter(quizData[currentQuestion].duration);
      }
    }
  }, [counter, quizData, currentQuestion, numberOfQuestions]);

  return (
    <div className="w-screen flex justify-center">
      {isAnswerTime ? <p>Answer time</p> : (
        <>
          <Question question={quizData[currentQuestion] as QuestionInterface} counter={counter}/>
        </>
      )}
    </div>
  );
}

export default App;
