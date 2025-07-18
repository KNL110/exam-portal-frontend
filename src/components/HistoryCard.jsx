import { Button } from './Button'

export const HistoryCard = (props) => {

    const { title, marks, totalMarks, onClick } = props;
    const { code, questionsLength, resultsLength } = props;

    if (props.response) {
        return (
            <div class="card">
                <h3 style={{ color: " #2e7d32", marginBottom: "10px" }}>{title}</h3>
                <p><strong>Marks:</strong> {marks}/{totalMarks}</p>
                <p><strong>Percentage:</strong>{((marks / totalMarks) * 100).toFixed(2)}%</p>
                <Button type="button" class="btn btn-primary" onClick={onClick}>View Details</Button>
            </div>
        )
    } else {
        return (
            <div class="card">
                <h3 style={{ color: " #2e7d32", marginBottom: "10px" }}>{title}</h3>
                <p><strong>Code:</strong> {code}</p>
                <p><strong>Questions:</strong> {questionsLength}</p>
                <p><strong>Students Attempted:</strong> {resultsLength}</p>
                <button type="button" class="btn btn-primary" onClick={onClick}>View Details</button>
            </div>
        )
    }
}
