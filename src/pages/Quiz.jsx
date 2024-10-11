import { useEffect, useState } from "react";
import Question from "../components/Questions";

const Quiz = () => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUsername(user.username);
  });
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-200 p-5">
        <div className="bg-white p-6 rounded-lg w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome to the Quiz!</h1>
          {username && (
            <p className="text-lg mb-4">
              Logged in as: <span className="font-semibold">{username}</span>
            </p>
          )}
        </div>
        <Question />
      </div>
    </>
  );
};

export default Quiz;
