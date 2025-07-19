export const ResponseCard = ({ question, answer, examMarkingScheme }) => {
    const getAnswerDisplay = () => {
        if (question.questionType === 'MCQ') {
            return answer.selectedOptions && answer.selectedOptions.length > 0
                ? question.options[parseInt(answer.selectedOptions[0])]
                : 'Not answered';
        } else if (question.questionType === 'NAT') {
            return answer.numericalAnswer || 'Not answered';
        }
        return 'Not answered';
    };

    const getCorrectAnswerDisplay = () => {
        if (question.questionType === 'MCQ') {
            return question.options[question.correctOption];
        } else if (question.questionType === 'NAT') {
            return question.correctValue.toString();
        }
        return 'Unknown';
    };

    const getAnswerStatus = () => {
        if (question.questionType === 'MCQ') {
            if (!answer.selectedOptions || answer.selectedOptions.length === 0) {
                return 'unattempted';
            }
            return parseInt(answer.selectedOptions[0]) === question.correctOption ? 'correct' : 'incorrect';
        } else if (question.questionType === 'NAT') {
            if (!answer.numericalAnswer) {
                return 'unattempted';
            }
            return parseFloat(answer.numericalAnswer) === question.correctValue ? 'correct' : 'incorrect';
        }
        return 'unattempted';
    };

    const getMarks = () => {
        const status = getAnswerStatus();
        if (status === 'correct') return examMarkingScheme.correct;
        if (status === 'incorrect') return examMarkingScheme.incorrect;
        return examMarkingScheme.unattempted;
    };

    const status = getAnswerStatus();
    const marks = getMarks();

    return (
        <div className={`card response-card ${status}`} style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ 
                    backgroundColor: '#f0f0f0', 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '12px',
                    fontWeight: 'bold'
                }}>
                    {question.questionType}
                </span>
                <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '12px',
                    fontWeight: 'bold',
                    backgroundColor: status === 'correct' ? '#d4edda' : 
                                   status === 'incorrect' ? '#f8d7da' : '#e2e3e5',
                    color: status === 'correct' ? '#155724' : 
                           status === 'incorrect' ? '#721c24' : '#6c757d'
                }}>
                    {status === 'correct' ? '✓ Correct' : 
                     status === 'incorrect' ? '✗ Incorrect' : 
                     '— Unattempted'}
                </span>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
                <strong>Q: </strong>{question.question}
            </div>

            {question.questionType === 'MCQ' && (
                <div style={{ marginBottom: '15px' }}>
                    <strong>Options:</strong>
                    <div style={{ marginLeft: '10px', marginTop: '8px' }}>
                        {question.options.map((option, index) => (
                            <div 
                                key={index} 
                                style={{
                                    padding: '8px',
                                    margin: '4px 0',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd',
                                    backgroundColor: 
                                        answer.selectedOptions && answer.selectedOptions.includes(index.toString()) 
                                            ? (index === question.correctOption ? '#d4edda' : '#f8d7da')
                                            : index === question.correctOption ? '#d1ecf1' : 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                <span style={{ fontWeight: 'bold' }}>
                                    {String.fromCharCode(65 + index)}.
                                </span>
                                <span>{option}</span>
                                {index === question.correctOption && (
                                    <span style={{ marginLeft: 'auto', color: '#28a745' }}>✓</span>
                                )}
                                {answer.selectedOptions && answer.selectedOptions.includes(index.toString()) && (
                                    <span style={{ marginLeft: 'auto', color: '#007bff' }}>Selected</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div style={{ marginBottom: '10px' }}>
                <div style={{ marginBottom: '5px' }}>
                    <strong>Your Answer: </strong>
                    <span style={{
                        color: status === 'correct' ? '#28a745' : 
                               status === 'incorrect' ? '#dc3545' : '#6c757d'
                    }}>
                        {getAnswerDisplay()}
                    </span>
                </div>
                
                {status !== 'correct' && (
                    <div style={{ marginBottom: '5px' }}>
                        <strong>Correct Answer: </strong>
                        <span style={{ color: '#28a745' }}>
                            {getCorrectAnswerDisplay()}
                        </span>
                    </div>
                )}
            </div>

            <div>
                <strong>Marks: </strong>
                <span style={{
                    color: marks > 0 ? '#28a745' : marks < 0 ? '#dc3545' : '#6c757d',
                    fontWeight: 'bold'
                }}>
                    {marks > 0 ? `+${marks}` : marks}
                </span>
            </div>
        </div>
    );
}
