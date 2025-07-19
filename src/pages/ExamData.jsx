import { SiteCard } from '../components/SiteCard'
import { useNavigate } from 'react-router-dom'
import { HistoryCard } from '../components/HistoryCard'

export const ExamData = () => {
    // Sample data
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
    const navigate = useNavigate();

    return (
        <SiteCard id="examHistoryPage">
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Exam Data</h2>
                </div>
                <div id="examHistoryList">
                    <HistoryCard
                        title = {exam.title}
                        code = {exam.code}
                        questionsLength = {exam.questions.length}
                        resultsLength = {exam.results.length}
                        onClick = {()=> navigate("/professor/examHistory/examDetails")}
                    />
                </div>
                <button type="button" className="btn" onClick={()=> navigate("/professor")}>Back to Dashboard</button>
            </div>
        </SiteCard>
    )
}
