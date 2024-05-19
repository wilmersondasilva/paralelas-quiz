import React from "react";
import { Question as QuestionInterface } from "./types";

interface QuestionProps {
  question: QuestionInterface;
  counter: number;
}

const Question: React.FC<QuestionProps> = ({ question, counter }) => {
  const type = question.type;
  const isFrame = type === "frame";
  const isDialogue = type === "dialogue";
  const isQuote = type === "quote";
  const isSoundtrack = type === "soundtrack";
  const isForca = type === "forca";
  const isGeneral = type === "general";

  return (
    <div className="flex flex-col items-center h-screen w-screen max-w-screen-2xl self-center border p-14">
      <h2 className="self-start text-3xl font-bold text-cyan-500">Pergunta #{question.id}</h2>
      <div className="flex w-full justify-between gap-16 mt-2">
        <h1 className="text-7xl">{question.question}</h1>
        <div className="rounded flex items-center justify-center bg-cyan-700 min-w-40 h-40">
          <span className="text-8xl">{counter}</span>
        </div>
      </div>
      <div className="w-full h-full mt-12">
        
        {isQuote && (
          <blockquote className="text-5xl italic text-[#c0f1ff] border-l-4 border-[#c0f1ff] pl-6 py-4"> 
            "{question.quote}"
          </blockquote>
        )}
      </div>
      {/* {audioUrl && <audio src={audioUrl} controls className="mb-4" />}
      {videoUrl && <video src={videoUrl} controls className="mb-4" />}
      {imageUrl && <img src={imageUrl} alt="Question" className="mb-4" />} */}
    </div>
  );
};

export default Question;
