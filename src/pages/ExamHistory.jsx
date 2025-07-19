import { SiteCard } from '../components/SiteCard'
import { useNavigate } from 'react-router-dom'
import { HistoryCard } from '../components/HistoryCard'
import { useExamData } from '../context/examDataContext'
import { getStudentResponsesApi } from '../api/studentResponseApi'
import { useEffect, useState } from 'react'

export const ExamHistory = () => {
    const { examsData } = useExamData();
    const [studentResponses, setStudentResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchStudentResponses();
    }, []);

    const fetchStudentResponses = async () => {
        try {
            const responses = await getStudentResponsesApi();
            // Filter responses for the current student (this will be automatically filtered by backend if using proper auth)
            setStudentResponses(responses);
        } catch (error) {
            console.error('Error fetching student responses:', error);
            if (error.message.includes('401')) {
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const getExamDetails = (examId) => {
        if (!examsData || !Array.isArray(examsData)) return null;
        return examsData.find(exam => exam._id === examId);
    };

    const calculateTotalMarks = (exam) => {
        if (!exam || !exam.questions || !exam.markingScheme) return 0;
        return exam.questions.length * exam.markingScheme.correct;
    };

    if (loading) {
        return (
            <SiteCard id="studentHistoryPage">
                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title">Loading Exam History...</h2>
                    </div>
                </div>
            </SiteCard>
        );
    }
    return (
        <SiteCard id="studentHistoryPage">
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">My Exam History</h2>
                </div>
                <div id="studentHistoryList">
                    {studentResponses && studentResponses.length > 0 ? (
                        studentResponses.map((response, index) => {
                            const exam = getExamDetails(response.examID);
                            const totalMarks = calculateTotalMarks(exam);
                            
                            return (
                                <HistoryCard
                                    key={response._id || index}
                                    title={exam ? exam.examName : 'Unknown Exam'}
                                    marks={response.score}
                                    totalMarks={totalMarks}
                                    onClick={() => {
                                        sessionStorage.setItem('selectedResponse', JSON.stringify(response));
                                        sessionStorage.setItem('selectedResponseExam', JSON.stringify(exam));
                                        navigate("/student/examHistory/response");
                                    }}
                                    response={true}
                                />
                            );
                        })
                    ) : (
                        <div className="card">
                            <p>No exam history found. Take an exam to see your results here.</p>
                        </div>
                    )}
                </div>
                <button type="button" className="btn" onClick={() => navigate("/student")}>Back to Dashboard</button>
            </div>
        </SiteCard>
    )
}
