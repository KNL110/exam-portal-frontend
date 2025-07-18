export const QuestionCard = ({ q }) => {
  return (
    <div className="question-card">
      <div className="question-text">{q.text}</div>

      {q.type === "mcq" ? (
        <div className="options">
          {q.options.map((option, index) => (
            <div
              key={index}
              className={`option ${index === q.correct ? "correct" : ""}`}
            >
              {option}
            </div>
          ))}
        </div>
      ) : (
        <div className="option correct">
          Correct Answer: {q.correct}
        </div>
      )}
    </div>
  );
};
