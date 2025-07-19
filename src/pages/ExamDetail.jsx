import { QuestionCard } from '../components/QuestionCard';
import { RanklistTable } from '../components/RankListTable';
import { SiteCard } from '../components/SiteCard'
import { useNavigate } from 'react-router-dom'
import { MarksChart } from '../components/MarksChart'
import { useExamData } from '../context/examDataContext'
import { useEffect, useState } from 'react'

export const ExamDetail = () => {
    const { responseData } = useExamData();
    const [examResponses, setExamResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const exam = JSON.parse(sessionStorage.getItem('selectedExam')) || {};

    useEffect(() => {
        if (responseData && exam._id) {
            const filteredResponses = responseData.filter(response => response.examID === exam._id);     
            setExamResponses(filteredResponses);
        }
        setLoading(false);
    }, [responseData, exam._id]);
    
    const marks = examResponses.map(r => r.score);
    const totalMarks = exam.questions ? exam.questions.length * (exam.markingScheme?.correct || 4) : 0;
    
    const avgMarks = marks.length > 0 ? (marks.reduce((a, b) => a + b, 0) / marks.length).toFixed(2) : 0;
    const highestMarks = marks.length > 0 ? Math.max(...marks) : 0;
    const lowestMarks = marks.length > 0 ? Math.min(...marks) : 0;
    
    const getMode = (arr) => {
        if (arr.length === 0) return 0;
        const frequency = {};
        let maxFreq = 0;
        let mode = arr[0];
        
        arr.forEach(num => {
            frequency[num] = (frequency[num] || 0) + 1;
            if (frequency[num] > maxFreq) {
                maxFreq = frequency[num];
                mode = num;
            }
        });
        
        return mode;
    };
    
    const mode = getMode(marks);

    const results = examResponses.map((response) => {
        return {
            studentId: response.studentID.rollNumber,
            name: response.studentID.name,
            marks: response.score
        };
    });

    if (loading) {
        return (
            <SiteCard id="examDetailsPage">
                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title">Loading Exam Details...</h2>
                    </div>
                </div>
            </SiteCard>
        );
    }

    return (
        <SiteCard id="examDetailsPage">
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Exam Details</h2>
                </div>
                <div id="examDetailsContent">
                    <h3 style={{ color: "#2e7d32", marginBottom: "20px" }}>{exam.examName || 'Exam Details'}</h3>
                    <h4 style={{ color: "#2e7d32", marginBottom: "15px" }}>Statistics</h4>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-value">{avgMarks}</div>
                            <div className="stat-label">Average Marks</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">{highestMarks}</div>
                            <div className="stat-label">Highest Marks</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">{lowestMarks}</div>
                            <div className="stat-label">Lowest Marks</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">{examResponses.length}</div>
                            <div className="stat-label">Total Students</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">{mode}</div>
                            <div className="stat-label">Mode</div>
                        </div>
                    </div>
                    <MarksChart marks={marks} totalMarks={totalMarks} examName={exam.examName} />

                    {examResponses.length > 0 ? (
                        <>
                            <h4 style={{ color: "#2e7d32", marginTop: "30px", marginBottom: "15px" }}>Student Rankings</h4>
                            <RanklistTable results={results} />
                        </>
                    ) : (
                        <div className="card" style={{ marginTop: '20px', textAlign: 'center', padding: '20px' }}>
                            <p>No students have taken this exam yet.</p>
                        </div>
                    )}

                    <h4 style={{ color: "#2e7d32", marginTop: "30px", marginBottom: "15px" }}>Questions and Answers</h4>
                    
                    {exam.questions && exam.questions.map((q, index) => 
                        <QuestionCard key={index} q={q} />
                    )}
                </div>
                <button type="button" className="btn" onClick={() => navigate("/professor/examHistory")}>Back to History</button>
            </div>
        </SiteCard>
    )
}
