export const QuestionCard = ({ q }) => {
  if (!q) return null;
  
  return (
    <div className="question-card" style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <div className="question-text" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
        Q: {q.question || q.text}
      </div>
      
      <div style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
        Type: {q.questionType || q.type} | Marks: {q.marks}
      </div>

      {(q.questionType === "MCQ" || q.type === "mcq") ? (
        <div className="options">
          {q.options && q.options.map((option, index) => {
            const correctIndex = q.correctOption !== undefined ? q.correctOption : q.correct;
            const isCorrect = index === correctIndex;
            
            return (
              <div
                key={index}
                className={`option ${isCorrect ? "correct" : ""}`}
                style={{
                  padding: '8px',
                  margin: '4px 0',
                  borderRadius: '4px',
                  border: isCorrect ? '2px solid #28a745' : '1px solid #ddd',
                  backgroundColor: isCorrect ? '#d4edda' : 'white'
                }}
              >
                <span style={{ fontWeight: 'bold', marginRight: '8px' }}>
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
                {isCorrect && (
                  <span style={{ float: 'right', color: '#28a745', fontWeight: 'bold' }}>✓ Correct</span>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="option correct" style={{
          padding: '8px',
          borderRadius: '4px',
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb'
        }}>
          <strong>Correct Answer: </strong>{q.correctValue || q.correct}
        </div>
      )}
    </div>
  );
};
