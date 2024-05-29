import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";

type AnswerDetailsProps = {
  description: string;
  examples: (string | { code: string; language: string })[];
  onClose: () => void;
};

const AnswerDetails: React.FC<AnswerDetailsProps> = ({
  description,
  examples,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full md:max-w-3xl">
        <h2 className="text-xl font-bold mb-4">{description}</h2>
        <div className="space-y-4">
          {examples.map((example, index) =>
            typeof example === "string" ? (
              <p key={index}>{example}</p>
            ) : (
              <SyntaxHighlighter
                key={index}
                language={example.language}
                style={coy}
              >
                {example.code}
              </SyntaxHighlighter>
            )
          )}
        </div>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AnswerDetails;
