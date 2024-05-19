import React, { useEffect } from "react";
import { Question as QuestionInterface } from "./types";

interface QuestionProps {
  question: QuestionInterface;
  counter: number;
  index: number;
}

const Question: React.FC<QuestionProps> = ({ question, counter, index }) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const type = question.type;
  const isFrame = type === "frame";
  const isDialogue = type === "dialogue";
  const isQuote = type === "quote";
  const isSoundtrack = type === "soundtrack";
  const isForca = type === "forca";
  const isGeneral = type === "general";
  const isStars = type === "stars";

  useEffect(() => {
    if (isSoundtrack || isDialogue) {
      audioRef.current?.play();
    }
  }, [isSoundtrack, isDialogue, audioRef]);

  return (
    <div className="flex flex-col items-center h-screen w-screen max-w-screen-2xl self-center px-14 pt-10">
      <div className="flex w-full justify-between gap-16">
        <div>
          <h2 className="text-3xl font-bold text-cyan-500">
            Pergunta #{index}
          </h2>
          <h1 className="text-7xl mt-2">{question.question}</h1>
        </div>
        <div className="rounded-2xl flex items-center justify-center bg-cyan-700 min-w-40 h-40">
          <span className="text-8xl">{counter}</span>
        </div>
      </div>
      <div className="w-full h-full mt-12">
        {isQuote && (
          <blockquote className="text-5xl italic text-[#c0f1ff] border-l-4 border-[#c0f1ff] pl-6 py-4">
            "{question.quote}"
          </blockquote>
        )}

        {isFrame && (
          <img
            src={`/images/${question.image}`}
            alt="Question"
            className="h-full m-auto"
          />
        )}

        {(isDialogue || isSoundtrack) && (
          <audio
            src={`/audios/${question.audio}`}
            autoPlay={true}
            muted={false}
            controls
            ref={audioRef}
          />
        )}

        {isForca && (
          <div>
            <p className="text-center text-9xl tracking-widest">
              {question.forca?.replace(/[^ ]/g, "_")}
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
                <p className="text-center mt-4 text-3xl">{index + 1}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* {audioUrl && <audio src={audioUrl} controls className="mb-4" />}
      {videoUrl && <video src={videoUrl} controls className="mb-4" />}
     */}
    </div>
  );
};

export default Question;
