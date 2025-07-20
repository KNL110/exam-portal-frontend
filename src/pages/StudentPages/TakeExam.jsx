import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SiteCard } from "../../components/SiteCard";

export const TakeExam = () => {
    const { examID } = useParams();
    const navigate = useNavigate();
    const [exam, setExam] = useState(null);
    const [answers, setAnswers] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    let startTime;

    useEffect(() => {
        fetchExam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [examID]);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && exam) {
            // Auto-submit when time is up
            submitExam();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeLeft, exam]);

    const fetchExam = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            alert('Please log in first to take an exam');
            navigate('/login');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/v1/exam/getExam/${examID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const result = await response.json();
                setExam(result.data);
                setTimeLeft(result.data.durationMinutes * 60); // Convert to seconds
                await startExamSession();

            } else if (response.status === 401) {
                alert('Your session has expired. Please log in again.');
                localStorage.removeItem('accessToken');
                navigate('/login');

            } else {
                const error = await response.json();
                alert(error.message || 'Failed to fetch exam');
                navigate('/student');
            }
        } catch (error) {
            alert('Error loading exam', error.message);
            navigate('/student');
        } finally {
            setIsLoading(false);
        }
    };

    const startExamSession = async () => {
        
        try {
            const response = await fetch(`http://localhost:3000/api/v1/exam/startExam/${examID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            
            if (response.ok) {
                const result = await response.json();
                startTime = result.data.startTime;
            } else {
                const error = await response.json();
                console.error('Start exam error:', error);
                alert(error.message || 'Failed to start exam');
                navigate('/student');
            }
        } catch (error) {
            console.error('Error starting exam:', error);
            alert(`Error starting exam: ${error.message}`);
            navigate('/student');
        }
    };

    const submitExam = async () => {
        if (isSubmitting) return;
        
        setIsSubmitting(true);
        
        try {
            const formattedAnswers = exam.questions.map(question => ({
                questionID: question._id,
                selectedOptions: question.questionType === 'MCQ' ? (answers[question._id]?.selectedOptions || []) : [],
                numericalAnswer: question.questionType === 'NAT' ? (answers[question._id]?.numericalAnswer || '') : ''
            }));

            const response = await fetch(`http://localhost:3000/api/v1/exam/submitExam/${examID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({
                    answers: formattedAnswers,
                    startTime: startTime
                })
            });

            if (response.ok) {
                const result = await response.json();
                alert(`Exam submitted successfully! Your score: ${result.data.score}`);
                navigate('/student/examHistory');
            } else {
                const error = await response.json();
                alert(error.message || 'Failed to submit exam');
            }
        } catch (error) {
            console.error('Error submitting exam:', error);
            alert('Error submitting exam');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAnswerChange = (questionId, type, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: {
                ...prev[questionId],
                [type]: value
            }
        }));
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    
    if (isLoading) {
        return (
            <SiteCard id="takeExam">
                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title">Loading Exam...</h2>
                    </div>
                </div>
            </SiteCard>
        );
    }

    if (!exam) {
        return (
            <SiteCard id="takeExam">
                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title">Exam not found</h2>
                    </div>
                </div>
            </SiteCard>
        );
    }

    const currentQ = exam.questions[currentQuestion];

    return (
        <SiteCard id="takeExam">
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">{exam.examName}</h2>
                    <div className="exam-timer">
                        <span className={`timer ${timeLeft < 300 ? 'danger' : ''}`}>
                            Time Left: {formatTime(timeLeft)}
                        </span>
                    </div>
                </div>
                
                <div className="exam-content">
                    <div className="question-navigation">
                        <span>Question {currentQuestion + 1} of {exam.questions.length}</span>
                        <div className="question-grid">
                            {exam.questions.map((_, index) => (
                                <button
                                    key={index}
                                    className={`question-nav-btn ${index === currentQuestion ? 'active' : ''} ${answers[exam.questions[index]._id] ? 'answered' : ''}`}
                                    onClick={() => setCurrentQuestion(index)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="question-section">
                        <div className="question-header">
                            <h3>Question {currentQuestion + 1}</h3>
                            <span className="marks">Marks: {currentQ.marks}</span>
                        </div>
                        
                        <div className="question-text">
                            {currentQ.question}
                        </div>

                        <div className="answer-section">
                            {currentQ.questionType === 'MCQ' ? (
                                <div className="mcq-options">
                                    {currentQ.options.map((option, index) => (
                                        <label key={index} className="option-label">
                                            <input
                                                type="radio"
                                                name={`question-${currentQ._id}`}
                                                value={index}
                                                checked={answers[currentQ._id]?.selectedOptions?.includes(index.toString())}
                                                onChange={(e) => handleAnswerChange(currentQ._id, 'selectedOptions', [e.target.value])}
                                            />
                                            <span className="option-text">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                <div className="numerical-answer">
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="form-input"
                                        placeholder="Enter numerical answer"
                                        value={answers[currentQ._id]?.numericalAnswer || ''}
                                        onChange={(e) => handleAnswerChange(currentQ._id, 'numericalAnswer', e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="exam-controls">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                            disabled={currentQuestion === 0}
                        >
                            Previous
                        </button>
                        
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => setCurrentQuestion(Math.min(exam.questions.length - 1, currentQuestion + 1))}
                            disabled={currentQuestion === exam.questions.length - 1}
                        >
                            Next
                        </button>
                        
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={submitExam}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Exam'}
                        </button>
                    </div>
                </div>
            </div>
        </SiteCard>
    );
};
