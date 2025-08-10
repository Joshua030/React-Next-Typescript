

export const Options = ({ question, dispatch, answer }) => {
  const hasAnswered = answer !== null

  const getOptionClass = (index) => {
    if (!hasAnswered) return "";
    if (index === question.correctOption) return "correct";
    return "wrong";
  };

  return (
    <div className="options">
      {question.options.map((option, index) => <button
        key={option}
        className={`btn btn-option ${index === answer ? "answer" : ""} ${getOptionClass(index)}`}
        onClick={() => dispatch({ type: "newAnswer", payload: index })}
        disabled={hasAnswered}
      >
        {option}
      </button>)}
    </div>
  )
}
