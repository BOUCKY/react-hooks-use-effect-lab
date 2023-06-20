import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  // get the current state of the time. The initial value of timeRemaining is 10 seconds.
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // setTimeout creates a timer
    const timer = setTimeout(() => {
      // If the timeRemaining is more than 0 seconds, subtract one second from the current time (per)
      if (timeRemaining > 0){
        setTimeRemaining(currentTime => currentTime -1)
      } else {
        // if the timeRemaining is not more than 0 seconds, set the timer back to 10 seconds and also set onAnswered to false meaning the question was not answered and to move on to the next
        setTimeRemaining(10)
        onAnswered(false)
      }
      // this is the time it will take before the setTimeout callback function will execute. (every 1000 milliseconds / 1 second)
    }, 1000 )
    return () => {
      // cleanup hook
      clearTimeout(timer)
    }
    // useEffect dependancies. useEffect will only run if either the timeRemaining state or onAnswered function changes
  }, [timeRemaining, onAnswered])

  function handleAnswer(isCorrect) {
    // resets the timeRemaining state back to 10 seconds when the function is called
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {/* maps over the answers array and renders a button element for each answer */}
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
