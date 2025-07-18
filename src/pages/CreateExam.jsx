// CreateExamPage.jsx
import { useState } from 'react';
import { QuestionCard } from '../components/ExamQuestion';
import axios from 'axios';
import { SiteCard } from '../components/SiteCard';

export const CreateExamPage = () => {
    const [examTitle, setExamTitle] = useState('');
    const [examCode, setExamCode] = useState('');
    const [correctMarks, setCorrectMarks] = useState(4);
    const [incorrectMarks, setIncorrectMarks] = useState(-1);
    const [unattemptedMarks, setUnattemptedMarks] = useState(0);
    const [timeLimit, setTimeLimit] = useState(60);

    const [questions, setQuestions] = useState([]);

    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
                id: Date.now(),
                type: 'MCQ',
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
            questions: formattedQuestions,
            createdBy: ""
        };

        try {
            const res = await axios.post('/api/v1/exam/creatExam', examData);
            console.log('Exam created:', res.data);
            alert('Exam created successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to create exam.');
        }
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

                    <button type="button" className="btn btn-success" onClick={addQuestion}>
                        Add Question
                    </button>

                    <button type="submit" className="btn btn-primary">
                        Save Exam
                    </button>
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
            </div>
        </SiteCard>
    );
}
