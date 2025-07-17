import { Button } from './Button'

export const HistoryCard = ({ title, marks, totalMarks, onClick }) => {

    return (
        <div class="card">
            <h3 style={{ color: " #2e7d32", marginBottom: "10px" }}>{title}</h3>
            <p><strong>Marks:</strong> {marks}/{totalMarks}</p>
            <p><strong>Percentage:</strong>{((marks / totalMarks) * 100).toFixed(2)}%</p>
            <Button type="button" class="btn btn-primary" onClick={onClick}>View Details</Button>
        </div>
    )
}
