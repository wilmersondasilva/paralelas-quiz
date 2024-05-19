import React, { useEffect } from "react";
import { Question as QuestionInterface } from "./types";

interface AnswerProps {
  question: QuestionInterface;
  nextAnswer: () => void;
  previousAnswer: () => void;
  index: number;
}

const Answer: React.FC<AnswerProps> = ({
  question,
  index,
  nextAnswer,
  previousAnswer,
}) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const type = question.type;
  const isFrame = type === "frame";
  const isDialogue = type === "dialogue";
  const isQuote = type === "quote";
  const isSoundtrack = type === "soundtrack";
  const isForca = type === "forca";
  const isGeneral = type === "general";
  const isStars = type === "stars";
  const isList = type === "list";

  useEffect(() => {
    if (isSoundtrack || isDialogue) {
      audioRef.current?.play();
    }
  }, [isSoundtrack, isDialogue, audioRef]);

  return (
    <div className="flex flex-col items-center h-screen w-screen max-w-screen-2xl self-center px-14 pt-10">
      <div className="flex justify-between w-full absolute bottom-14 px-10">
        <button
          onClick={previousAnswer}
          className="text-3xl font-bold text-cyan-500"
        >
          Anterior
        </button>
        <button
          onClick={nextAnswer}
          className="text-3xl font-bold text-cyan-500"
        >
          Próxima
        </button>
      </div>
      <div className="flex w-full justify-between gap-16">
        <div>
          <h2 className="text-3xl font-bold text-cyan-500">
            Pergunta #{index}
          </h2>
          <h1 className="text-7xl mt-2">{question.question}</h1>
        </div>
      </div>
      <div className="w-full h-full mt-12">
        {isGeneral && (
          <p className="text-6xl text-[#c0f1ff]">{question.answer}</p>
        )}

        {isQuote && (
          <div>
            <blockquote className="text-5xl italic text-[#c0f1ff] border-l-4 border-[#c0f1ff] pl-6 py-4">
              "{question.quote}"
            </blockquote>

            <p className="text-6xl text-[#c0f1ff] mt-10 text-right">{question.answer}</p>
          </div>
        )}

        {isFrame && (
          <div>
            <p className="text-6xl text-[#c0f1ff] mb-5">{question.answer}</p>

            <img
              src={`/images/${question.image}`}
              alt="Question"
              className="h-full m-auto"
            />
          </div>
        )}

        {(isDialogue || isSoundtrack) && (
          <div>
            <p className="text-6xl text-[#c0f1ff] mb-5">{question.answer}</p>
            <video
              src={`/videos/${question.video}`}
              autoPlay={true}
              muted={false}
              controls
              className="h-full m-auto"
            />
          </div>
        )}

        {isForca && (
          <div>
            <p className="text-7xl text-[#c0f1ff] text-center mt-4">
              {question.answer}
            </p>

            <div className="flex justify-center mt-8 gap-6">
              {question.genres?.map((genre) => (
                <span
                  key={genre}
                  className="text-4xl text-center capitalize bg-green-800 py-2 px-4 rounded-lg"
                >
                  {genre}
                </span>
              ))}
            </div>

            <p className="text-center text-5xl mt-7">{question.hint}</p>
          </div>
        )}

        {isStars && (
          <div className="flex gap-6 justify-between items-center h-full">
            {question.stars?.map((image, index) => (
              <div className="w-1/4">
                <img
                  key={index}
                  src={`/images/${image}`}
                  alt="Star"
                  className=" w-full object-cover rounded-lg"
                />
                <p className="text-center mt-4 text-3xl">{question.answer[index]}</p>
              </div>
            ))}
          </div>
        )}

        {isList && (
          <div className="flex flex-col gap-2 justify-between items-center h-full">
            <ul className="">
              {question.answer?.map((item) => (
                <li key={item}>
                  <p className="text-center mt-4 text-3xl">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Answer;
