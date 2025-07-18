export const QuestionCard = ({ number, removeQuestion, handleChange, question }) => {

    const toggleQuestionType = (e) => {
        handleChange(number, 'type', e.target.value);
    };

    return (
        <div className="question-card" id={`question-${number}`}>
            <div className="question-header">
                <span className="question-number">Question {number}</span>
                <button type="button" className="btn btn-danger" onClick={() => removeQuestion(number)}>Remove</button>
            </div>

            <div className="form-group">
                <label className="form-label">Question Type</label>
                <select
                    className="form-select"
                    value={question.type}
                    onChange={toggleQuestionType}
                >
                    <option value="mcq">Multiple Choice</option>
                    <option value="numerical">Numerical Answer</option>
                </select>
            </div>

            <div className="form-group">
                <label className="form-label">Question Text</label>
                <textarea
                    className="form-textarea"
                    value={question.text}
                    onChange={(e) => handleChange(number, 'text', e.target.value)}
                    required
                ></textarea>
            </div>

            {question.type === 'mcq' && (
                <div id={`mcqOptions-${number}`}>
                    <div className="form-group">
                        <label className="form-label">Options</label>
                        {[0, 1, 2, 3].map((i) => (
                            <input
                                key={i}
                                type="text"
                                className="form-input"
                                placeholder={`Option ${i + 1}`}
                                value={question.options[i] || ''}
                                onChange={(e) => {
                                    const newOptions = [...question.options];
                                    newOptions[i] = e.target.value;
                                    handleChange(number, 'options', newOptions);
                                }}
                                required={i < 3}
                            />
                        ))}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Correct Answer</label>
                        <select
                            className="form-select"
                            value={question.correct}
                            onChange={(e) => handleChange(number, 'correct', parseInt(e.target.value))}
                        >
                            {[0, 1, 2, 3].map((i) => (
                                <option key={i} value={i}>{`Option ${i + 1}`}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            {question.type === 'numerical' && (
                <div id={`numericalAnswer-${number}`}>
                    <div className="form-group">
                        <label className="form-label">Correct Answer</label>
                        <input
                            type="number"
                            className="form-input"
                            step="0.01"
                            value={question.correct}
                            onChange={(e) => handleChange(number, 'correct', e.target.value)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
