// CreateExamPage.jsx
import { useState } from 'react';
import { QuestionCard } from '../components/ExamQuestion';
import axios from 'axios';
import { SiteCard } from '../components/SiteCard';
import { useNavigate } from 'react-router-dom';

export const CreateExamPage = () => {
    // Initial state values
    const initialState = {
        examTitle: '',
        examCode: '',
        correctMarks: 4,
        incorrectMarks: -1,
        unattemptedMarks: 0,
        timeLimit: 60,
        questions: []
    };

    const [examTitle, setExamTitle] = useState(initialState.examTitle);
    const [examCode, setExamCode] = useState(initialState.examCode);
    const [correctMarks, setCorrectMarks] = useState(initialState.correctMarks);
    const [incorrectMarks, setIncorrectMarks] = useState(initialState.incorrectMarks);
    const [unattemptedMarks, setUnattemptedMarks] = useState(initialState.unattemptedMarks);
    const [timeLimit, setTimeLimit] = useState(initialState.timeLimit);

    const [questions, setQuestions] = useState(initialState.questions);

    const navigate = useNavigate();

    // Reset form to initial state
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

        // Validation
        if (questions.length === 0) {
            alert('Please add at least one question before saving the exam.');
            return;
        }

        // Check if all questions have text
        const emptyQuestions = questions.filter(q => !q.text.trim());
        if (emptyQuestions.length > 0) {
            alert('Please fill in all question texts before saving.');
            return;
        }

        // Check MCQ questions have at least 2 options
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
            questions: formattedQuestions,
            // createdBy will be set by the backend from the authenticated user
        };

        try {
            // Get token from localStorage (as stored in login)
            const token = localStorage.getItem('accessToken');
            
            console.log('Token:', token ? 'Found' : 'Not found');
            console.log('Exam Data being sent:', JSON.stringify(examData, null, 2));
            
            const res = await axios.post('/api/v1/exam/creatExam', examData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Exam created:', res.data);
            alert('Exam created successfully!');
            
            // Reset form to original state
            resetForm();
        } catch (error) {
            console.error('Full error object:', error);
            console.error('Error response:', error.response);
            console.error('Error response data:', error.response?.data);
            
            if (error.response?.status === 401) {
                alert('Authentication failed. Please log in again.');
            } else if (error.response?.status === 400) {
                alert(`Bad Request: ${error.response?.data?.message || 'Invalid data sent to server'}`);
            } else {
                alert(`Failed to create exam: ${error.response?.data?.message || error.message}`);
            }
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
