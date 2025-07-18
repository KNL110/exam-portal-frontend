import { QuestionCard } from '../components/QuestionCard';
import { RanklistTable } from '../components/RankListTable';
import { SiteCard } from '../components/SiteCard'
import { useNavigate } from 'react-router-dom'

export const ExamDetail = () => {

    let exam = {
        id: 1,
        title: "Physics Mock Test",
        code: "PHY001",
        correctMarks: 4,
        incorrectMarks: -1,
        unattemptedMarks: 0,
        timeLimit: 60,
        questions: [
            {
                id: 1,
                type: "mcq",
                text: "What is the unit of force?",
                options: ["Newton", "Joule", "Watt", "Pascal"],
                correct: 0
            },
            {
                id: 2,
                type: "numerical",
                text: "Calculate the acceleration due to gravity (m/s²)",
                correct: 9.8
            }
        ],
        results: [
            { studentId: "S001", name: "John Doe", marks: 7, responses: [0, 9.8] },
            { studentId: "S002", name: "Jane Smith", marks: 3, responses: [0, 10] }
        ]
    }

    const marks = exam.results.map(r => r.marks);
    const avgMarks = marks.length > 0 ? (marks.reduce((a, b) => a + b, 0) / marks.length).toFixed(2) : 0;
    const highestMarks = marks.length > 0 ? Math.max(...marks) : 0;
    const lowestMarks = marks.length > 0 ? Math.min(...marks) : 0;

    const navigate = useNavigate();

    return (
        <SiteCard id="examDetailsPage">
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Exam Details</h2>
                </div>
                <div id="examDetailsContent">
                    <h3 style={{ color: "#2e7d32", marginBottom: "20px" }}>{exam.title}</h3>
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
                            <div className="stat-value">{exam.results.length}</div>
                            <div className="stat-label">Total Students</div>
                        </div>
                    </div>
                    <QuestionCard q={exam.questions[0]} />
                    <QuestionCard q={exam.questions[1]} />
                    <RanklistTable results={exam.results} />
                </div>
                <button type="button" className="btn" onClick={() => navigate("/professor/examHistory")}>Back to History</button>
            </div>
        </SiteCard>
    )
}
