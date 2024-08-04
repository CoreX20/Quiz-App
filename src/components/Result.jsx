const Result = ({ correctAnswers, incorrectAnswers, totalAnswered }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg">
      <h2 className="font-bold">Quiz Ended!</h2>
      <p className="text-green-600">Correct Answers: {correctAnswers}</p>
      <p className="text-red-500">Incorrect Answers: {incorrectAnswers}</p>

      <p>Total Answered: {totalAnswered}</p>
    </div>
  );
};

export default Result;
