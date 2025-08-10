export const StartScreen = ({ numQuestions, dispatch }) => {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuestions} questions to test yor React matery</h3>
      <button className="btn btn-ui" onClick={() => dispatch({ type: "start" })}>Lets's start</button>
    </div>
  )
}
