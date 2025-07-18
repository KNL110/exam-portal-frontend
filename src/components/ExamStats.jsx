import { QuestionCard } from "./QuestionCard";
import { RanklistTable } from "./RankListTable";


export const ExamDetails = ({ exam }) => {

    const marks = exam.results.map(r => r.marks);
    const avgMarks = marks.length > 0 ? (marks.reduce((a, b) => a + b, 0) / marks.length).toFixed(2) : 0;
    const highestMarks = marks.length > 0 ? Math.max(...marks) : 0;
    const lowestMarks = marks.length > 0 ? Math.min(...marks) : 0;

    return (
        <div id="examDetailsContent">
            <h3 style={{ color: "#2e7d32", marginBottom: "20px" }}>{exam.title}</h3>
            <h4 style={{ color: "#2e7d32", marginBottom: "15px" }}>Statistics</h4>
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
            <QuestionCard q={exam.questions[0]} />
            <QuestionCard q={exam.questions[1]} />
            <RanklistTable results={exam.results} />
        </div>
    )
}
