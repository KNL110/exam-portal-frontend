import { SiteCard } from '../../components/SiteCard'
import { useNavigate } from 'react-router-dom'
import { HistoryCard } from '../../components/HistoryCard'
import { useExamData } from '../../context/ProfessorContext'
import { useEffect, useState } from 'react'
import { examDataApi } from '../../api/examDataApi'

export const ExamData = () => {
    const { responseData } = useExamData();
    const [loading, setLoading] = useState(true);
    const [examsData, setExamData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (examsData && responseData) {
            setLoading(false);
            setExamData(examDataApi());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const getResponseCount = (examId) => {
        if (!responseData || !Array.isArray(responseData)) return 0;
        return (responseData.filter(response => response.examID === examId)).length;
    };

    if (loading) {
        return (
            <SiteCard id="examHistoryPage">
                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title">Loading Exam Data...</h2>
                    </div>
                </div>
            </SiteCard>
        );
    }

    return (
        <SiteCard id="examHistoryPage">
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Exam Data</h2>
                </div>
                <div id="examHistoryList">
                    {examsData && examsData.length > 0 ? (
                        examsData.map((exam, index) => (
                            <HistoryCard
                                key={exam._id || index}
                                title={exam.examName}
                                code={exam.examID}
                                questionsLength={exam.questions ? exam.questions.length : 0}
                                resultsLength={getResponseCount(exam._id)}
                                onClick={() => {
                                    sessionStorage.setItem('selectedExam', JSON.stringify(exam));
                                    navigate("/professor/examHistory/examDetails");
                                }}
                            />
                        ))
                    ) : (
                        <div className="card">
                            <p>No exams found. Create an exam to see it here.</p>
                        </div>
                    )}
                </div>
                <button type="button" className="btn" onClick={() => navigate("/professor")}>Back to Dashboard</button>
            </div>
        </SiteCard>
    )
}
