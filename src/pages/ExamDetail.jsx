import { ExamDetails } from '../components/ExamStats';
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

    const navigate = useNavigate();

    return (
        <SiteCard id="examDetailsPage">
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Exam Details</h2>
                </div>
                <ExamDetails exam={exam}/>
                <button type="button" class="btn" onClick={() => navigate("/professor/examHistory")}>Back to History</button>
            </div>
        </SiteCard>
    )
}
