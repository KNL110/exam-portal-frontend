import { useState } from 'react';
import { QuestionCard } from '../../components/ExamQuestion';
import { SiteCard } from '../../components/SiteCard';
import { useNavigate } from 'react-router-dom';
import { createExamApi } from '../../api/createExamApi';

export const CreateExamPage = () => {
    const initialState = {
        examTitle: '',
        examCode: '',
        correctMarks: 4,
        incorrectMarks: -1,
        unattemptedMarks: 0,
        timeLimit: 60,
        questions: []
    };
    const navigate = useNavigate();

    const [examTitle, setExamTitle] = useState(initialState.examTitle);
    const [examCode, setExamCode] = useState(initialState.examCode);
    const [correctMarks, setCorrectMarks] = useState(initialState.correctMarks);
    const [incorrectMarks, setIncorrectMarks] = useState(initialState.incorrectMarks);
    const [unattemptedMarks, setUnattemptedMarks] = useState(initialState.unattemptedMarks);
    const [timeLimit, setTimeLimit] = useState(initialState.timeLimit);
    const [questions, setQuestions] = useState(initialState.questions);


    const resetForm = () => {
        setExamTitle(initialState.examTitle);
        setExamCode(initialState.examCode);
        setCorrectMarks(initialState.correctMarks);
        setIncorrectMarks(initialState.incorrectMarks);
        setUnattemptedMarks(initialState.unattemptedMarks);
        setTimeLimit(initialState.timeLimit);
        setQuestions(initialState.questions);
    };

    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
                id: Date.now(),
                type: 'mcq',
                text: '',
                options: ['', '', '', ''],
                correct: 0,
            },
        ]);
    };

    const removeQuestion = (number) => {
        setQuestions(questions.filter((_, idx) => idx + 1 !== number));
    };

    const handleQuestionChange = (number, field, value) => {
        setQuestions(
            questions.map((q, idx) =>
                idx + 1 === number ? { ...q, [field]: value } : q
            )
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (questions.length === 0) {
            alert('Please add at least one question before saving the exam.');
            return;
        }

        const emptyQuestions = questions.filter(q => !q.text.trim());
        if (emptyQuestions.length > 0) {
            alert('Please fill in all question texts before saving.');
            return;
        }

        const incompleteQuestions = questions.filter(q =>
            q.type === 'mcq' && q.options.filter(opt => opt.trim() !== '').length < 2
        );
        if (incompleteQuestions.length > 0) {
            alert('MCQ questions must have at least 2 options.');
            return;
        }

        const formattedQuestions = questions.map((q) => ({
            questionID: `Q-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            question: q.text,
            questionType: q.type === 'mcq' ? 'MCQ' : 'NAT',
            options: q.type === 'mcq' ? q.options.filter((opt) => opt.trim() !== '') : [],
            correctOption: q.type === 'mcq' ? q.correct : undefined,
            correctValue: q.type === 'numerical' ? parseFloat(q.correct) : undefined,
            marks: correctMarks,
        }));

        const examData = {
            examID: examCode,
            examName: examTitle,
            durationMinutes: timeLimit,
            markingScheme: {
                correct: correctMarks,
                incorrect: incorrectMarks,
                unattempted: unattemptedMarks,
            },
            questions: formattedQuestions
        };

        await createExamApi(examData)
            .then(() => resetForm())
            .catch((error) => alert(`Failed to create exam: ${error.message}`))
    };

    return (
        <SiteCard id="createExamPage">
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Create New Exam</h2>
                </div>

                <form id="createExamForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Exam Title</label>
                        <input
                            type="text"
                            className="form-input"
                            value={examTitle}
                            onChange={(e) => setExamTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Exam Code (Unique)</label>
                        <input
                            type="text"
                            className="form-input"
                            value={examCode}
                            onChange={(e) => setExamCode(e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid grid-3">
                        <div className="form-group">
                            <label className="form-label">Marks for Correct Answer</label>
                            <input
                                type="number"
                                className="form-input"
                                value={correctMarks}
                                onChange={(e) => setCorrectMarks(parseInt(e.target.value))}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Marks for Incorrect Answer</label>
                            <input
                                type="number"
                                className="form-input"
                                value={incorrectMarks}
                                onChange={(e) => setIncorrectMarks(parseInt(e.target.value))}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Marks for Unattempted</label>
                            <input
                                type="number"
                                className="form-input"
                                value={unattemptedMarks}
                                onChange={(e) => setUnattemptedMarks(parseInt(e.target.value))}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Time Limit (minutes)</label>
                        <input
                            type="number"
                            className="form-input"
                            value={timeLimit}
                            onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn btn-success" onClick={addQuestion}>
                            Add Question
                        </button>

                        <button type="submit" className="btn btn-primary">
                            Save Exam
                        </button>

                        <button type="button" className="btn" onClick={resetForm}>
                            Clear Form
                        </button>
                    </div>
                </form>

                <div id="questionsContainer">
                    {questions.map((q, idx) => (
                        <QuestionCard
                            key={q.id}
                            number={idx + 1}
                            question={q}
                            removeQuestion={removeQuestion}
                            handleChange={handleQuestionChange}
                        />
                    ))}
                </div>

                <div className="form-actions">
                    <button type="button" className="btn" onClick={() => navigate('/professor')}>
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </SiteCard>
    );
}
