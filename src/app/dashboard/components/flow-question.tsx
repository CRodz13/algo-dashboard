import React, { useState } from "react";

type QuestionProps = {
  question: string;
  example?: string | undefined;
  yesQuestion?: string;
  noQuestion?: string;
  yesAnswer?: string;
  noAnswer?: string;
  onAnswer: (nextQuestionId: string) => void;
};

export default function FlowQuestion({
  question,
  example,
  yesQuestion,
  noQuestion,
  yesAnswer,
  noAnswer,
  onAnswer,
}: QuestionProps) {
  const [showExample, setShowExample] = useState(false);

  const toggleExample = () => {
    setShowExample(!showExample);
  };

  return (
    <div className="flex flex-col items-center m-8">
      <div className="flex justify-center items-center">
        <div className="w-28 h-28 rotate-45 bg-yellow-400 shadow hover:shadow-lg hover:shadow-yellow-800 relative">
          <div className="absolute inset-0 flex flex-col justify-center items-center transform -rotate-45 text-center font-bold">
            <div
              onClick={toggleExample}
              className="cursor-pointer hover:underline"
            >
              {question}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        {showExample && example && (
          <div className="text-center mt-4">
            <p>{example}</p>
          </div>
        )}
        {yesQuestion || yesAnswer ? (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => onAnswer(yesQuestion || yesAnswer || "")}
          >
            Yes
          </button>
        ) : null}
        {noQuestion || noAnswer ? (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => onAnswer(noQuestion || noAnswer || "")}
          >
            No
          </button>
        ) : null}
      </div>
    </div>
  );
}
