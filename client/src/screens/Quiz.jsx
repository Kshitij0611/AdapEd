import { useState, useEffect } from "react";
import axios from "axios";
import Questions from "../components/Questions";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const [questions, setQuestions] = useState();
  const [topic, setTopic] = useState();
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    // const topics=params.slug.slice(0,params.slug.indexOf('-'));
    // console.log(topics)
    let a = async () => {
      const params = window.location.pathname;
      let topic = params.slice(6, params.indexOf("-"));
      console.log(topic);
      setTopic(topic);
      try {
         await axios.get(
          `http://localhost:8080/api/model/question/${topic}`
        ).then((res) => {
          console.log(typeof(res.data))
          if(res.data){
            setLoaderState(false)
            setQuestions(res.data);
            // setCounter(1);
            console.log(res.data);
          }
        });
      } catch (err) {
        console.log(err);
      }
    };
    a();
  },[counter]);
  const navigate = useNavigate();
  // const questions={
  //     "questions": [
  //       {
  //         "questionId": 1,
  //         "topic": "JavaScript",
  //         "question": "Which keyword is used to declare a variable in JavaScript?",
  //         "correctAnswer": "let",
  //         "options": ["var", "let", "const", "int"],
  //         "difficulty": "easy"
  //       },
  //       {
  //         "questionId": 2,
  //         "topic": "JavaScript",
  //         "question": "What is the result of the following expression: 5 + '5'?",
  //         "correctAnswer": "55",
  //         "options": ["10", "55", "6", "Error"],
  //         "difficulty": "easy"
  //       },
  //       {
  //         "questionId": 3,
  //         "topic": "JavaScript",
  //         "question": "Which method is used to add a new element to the end of an array?",
  //         "correctAnswer": "push()",
  //         "options": ["pop()", "shift()", "push()", "unshift()"],
  //         "difficulty": "easy"
  //       },
  //       {
  //         "questionId": 4,
  //         "topic": "JavaScript",
  //         "question": "What is the correct way to write a comment in JavaScript?",
  //         "correctAnswer": "// This is a comment",
  //         "options": ["<!-- This is a comment -->", "// This is a comment", "/* This is a comment */", "# This is a comment"],
  //         "difficulty": "medium"
  //       },
  //       {
  //         "questionId": 5,
  //         "topic": "JavaScript",
  //         "question": "Which function is used to convert a string to a number in JavaScript?",
  //         "correctAnswer": "parseInt()",
  //         "options": ["convertInt()", "toNumber()", "parseInt()", "stringToNumber()"],
  //         "difficulty": "medium"
  //       },
  //       {
  //         "questionId": 6,
  //         "topic": "JavaScript",
  //         "question": "What is the result of the following expression: 3 == '3'?",
  //         "correctAnswer": "true",
  //         "options": ["true", "false", "Error", "Undefined"],
  //         "difficulty": "medium"
  //       },
  //       {
  //         "questionId": 7,
  //         "topic": "JavaScript",
  //         "question": "Which operator is used to combine two or more strings in JavaScript?",
  //         "correctAnswer": "+",
  //         "options": ["&", "+", "||", "and"],
  //         "difficulty": "medium"
  //       },
  //       {
  //         "questionId": 8,
  //         "topic": "JavaScript",
  //         "question": "What is the result of the following expression: 5 * '3'?",
  //         "correctAnswer": "15",
  //         "options": ["8", "15", "Error", "Undefined"],
  //         "difficulty": "hard"
  //       },
  //       {
  //         "questionId": 9,
  //         "topic": "JavaScript",
  //         "question": "Which method is used to remove the last element from an array in JavaScript?",
  //         "correctAnswer": "pop()",
  //         "options": ["pop()", "push()", "shift()", "unshift()"],
  //         "difficulty": "hard"
  //       },
  //       {
  //         "questionId": 10,
  //         "topic": "JavaScript",
  //         "question": "What is the correct way to declare a function in JavaScript?",
  //         "correctAnswer": "function myFunction() {}",
  //         "options": ["myFunction = function() {}", "function myFunction() {}", "var myFunction = () => {}", "const myFunction = function() {}"],
  //         "difficulty": "hard"
  //       }
  //     ]
  //   }
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loaderState,setLoaderState]=useState(true)
  const [score, setScore] = useState(0);
  const handleAnswer = (questionId, option) => {
    const index = selectedOptions.findIndex(
      (obj) => obj.questionId === questionId
    );
    if (index !== -1) {
      console.log(
        "index matched:",
        index,
        "questionId:",
        questionId,
        "option:",
        option
      );
      selectedOptions.splice(index, 1, { questionId, option });
    } else {
      selectedOptions.push({ questionId, option });
    }
    setSelectedOptions(selectedOptions);
    console.log(selectedOptions);
  };
  const [shoeModal, setShowModal] = useState(false);
  const handleSubmit = async () => {
    selectedOptions.sort();
    console.log(selectedOptions);
    // console.log(selectedOptions.length);
    // console.log(questions.questions[0].correctAnswer);
    let score = 0;
    if (selectedOptions.length > 0) {
      for (let i = 0; i < selectedOptions.length; i++) {
        if (
          selectedOptions[i].option === questions.questions[i].correctAnswer
        ) {
          score++;
          console.log(1);
        }
      }
    }
    console.log("score:", score);
    setScore(score);
    setShowModal(true);
    const uid = localStorage.getItem("userID");
    axios
      .post("http://localhost:8080/api/model/result", {
        score,
        _id: uid,
        topics: topic,
      })
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <>
    {loaderState?
      <div role="status" className="flex justify-center items-center ">
        <svg
          aria-hidden="true"
          className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
      :null}
      {questions?.questions?.map((question, index) => (
        <Questions
          key={index}
          questionId={question.questionId}
          question={question}
          handleAnswer={handleAnswer}
          // topic={question.topic}
          difficulty={question.difficulty}
        />
      ))}
      <div className="flex justify-center">
        <button
          className="bg-black hover:bg-gray-700 text-gray-200 font-bold py-2 px-6 my-4 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
        {createPortal(
          <>
            {shoeModal ? (
              <>
                <div
                  className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`}
                >
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-3xl font-semibold ">Result</h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          //   onClick={() => setShowModal(false)}
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex-auto">
                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                          Score: {score}
                        </p>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => {
                            setShowModal(false);
                            setSelectedOptions([]);
                            navigate("/");
                          }}
                        >
                          Okay
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
          </>,
          document.getElementById("root")
        )}
      </div>
    </>
  );
}
