import { useState, useEffect } from "react";
import WeakTopic from '../img/weaktopics.jpg'
import AllTopics from '../img/alltopics.jpg'
// Quiz UI Component
function Home() {
  return (
    <div className="mx-auto  max-w-5xl p-10 bg-gray-800 rounded md:mt-10">
      <h1 className="text-2xl mb-8 text-center bg-gray-900 p-3 rounded-xl md:w-2/3 mx-auto">
        <span className="text-yellow-500">Hey User 1 </span>Click on any topic to start a quiz.
      </h1>
      <div className="flex justify-center flex-col md:flex-row">
        <QuizSection title="Weak topics" img={WeakTopic}/>
        <QuizSection title="All topics" img={AllTopics}/>
      </div>
    </div>
  );
}
export default Home;
// Quiz Section Component
function QuizSection({ title,img }) {
  return (
    <div className="flex flex-col bg-gray-600 rounded-xl m-5 relative">
      <img src={img} alt="1" className="aspect-video mix-blend-overlay w-full rounded-xl" width={300} height={300} />
      <h2 className="text-xl font-bold absolute p-2">{title}</h2>
      {title === "Weak topics" ? (
        <>
      <div className="scroll-container">
        No weak topics
      </div>
        </>
      ):(
        <>
        <QuizButton label="Javascript" />
        <QuizButton label="HTML" />
        <QuizButton label="C++" />
        </>
      )}
    </div>
  );
}

// Quiz Button Component
function QuizButton({ label }) {
  //fetch the userId stored in localstorage
  const [UserID,setUserID]=useState({});
  useEffect(()=>{
    setUserID(localStorage.getItem("userID"));
  }, [])
  console.log(UserID)
  return (
    <a href={`/quiz/${label}-${UserID}`} className="flex flex-col items-center text-center justify-center">
      <div className="bg-black w-1/3 rounded-full p-2 m-2 hover:bg-green-700">{label}</div>
    </a>
  );
}

