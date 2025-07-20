import { SiteCard } from '../../components/SiteCard'
import { useNavigate } from 'react-router-dom'
import { HistoryCard } from '../../components/HistoryCard'
import { useExamData } from '../../context/StudentContext'
import { useState, useEffect } from 'react'
import { getOneExamDataApi } from '../../api/examDataApi.js'

export const ExamHistory = () => {
    const { examsData, studentResponses } = useExamData();
    
    const [loading, setLoading] = useState(true);
    const [examDetails, setExamDetails] = useState({});
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchExamDetails();
    }, [studentResponses, examsData]) // eslint-disable-line react-hooks/exhaustive-deps
    
    const fetchExamDetails = async () => {
        if (!studentResponses || studentResponses.length === 0) {
            setLoading(false);
            return;
        }
        
        const details = {};
        
        // First try to find exam details from examsData context
        for (const response of studentResponses) {
            // Handle both old format (ObjectId) and new format (string)
            const examId = response.examID;
            
            if (!examId) {
                console.warn('Response missing examID:', response);
                continue;
            }
            
            // Look for exam in examsData first (faster)
            const localExam = examsData.find(exam => exam.examID === examId || exam._id === examId);
            if (localExam) {
                details[examId] = localExam;
            } else {
                // Fallback to API call if not found locally
                try {
                    const examData = await getOneExamDataApi(examId);
                    details[examId] = examData;
                } catch (error) {
                    console.error(`Error fetching exam ${examId}:`, error);
                    details[examId] = null;
                }
            }
        }
        
        setExamDetails(details);
        setLoading(false);
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
                    {(studentResponses && studentResponses.length > 0) ? (
                        studentResponses.map((response, index) => {
                            const exam = examDetails[response.examID];
                            
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
                    )
                    }
                </div>
                <button type="button" className="btn" onClick={() => navigate("/student")}>Back to Dashboard</button>
            </div>
        </SiteCard>
    )
}
