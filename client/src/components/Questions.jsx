import { useState } from "react";
const Questions = ({ question, handleAnswer, topic, difficulty, questionId }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <div className="md:mx-auto max-w-5xl p-10 bg-gray-800 rounded md:mt-10 m-5 text-gray-200">
      
      <div>
        <h1 className="text-2xl mb-8 bg-gray-900 p-3 rounded-xl mx-auto flex justify-between items-center flex-col">
          {questionId}.{question.question}
          <div className="flex flex-row gap-4">
            <h1 className="bg-yellow-500 px-2 text-sm text-black font-semibold rounded-full">
              {difficulty}
            </h1>
            {/* <h1 className="bg-yellow-500 px-2 text-sm text-black font-semibold rounded-full">
              {topic}
            </h1> */}
          </div>
        </h1>
        <div className="grid md:grid-cols-2 gap-4">
          {question?.options?.map((option, index) => (
            <button
              key={index}
              className={`flex items-center bg-gray-600 rounded-xl px-5 py-3 w-full text-center  ${
                selectedOption === option ? "bg-yellow-600" : " hover:bg-black"
              }`}
              onClick={() => {
                setSelectedOption(option);
                handleAnswer(questionId, option);
              }}
            >
               {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Questions;
