import { SiteCard } from '../components/SiteCard'
import { useNavigate } from 'react-router-dom'

export const ExamDetails = () => {

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
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Exam Details</h2>
                </div>
                <div id="examDetailsContent">
                    <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-value">{avgMarks}</div>
                        <div class="stat-label">Average Marks</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">{highestMarks}</div>
                        <div class="stat-label">Highest Marks</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">{lowestMarks}</div>
                        <div class="stat-label">Lowest Marks</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">{exam.results.length}</div>
                        <div class="stat-label">Total Students</div>
                    </div>
                    
                </div>
                </div>
                <button type="button" class="btn btn-secondary" onclick="showExamHistory()">Back to History</button>
            </div>
        </SiteCard>
    )
}
