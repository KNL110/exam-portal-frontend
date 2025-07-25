export const HistoryCard = (props) => {

    const { title, marks, totalMarks, onClick } = props;
    const { code, questionsLength, resultsLength } = props;

    if (props.response) {
        return (
            <div className="card">
                <h3 style={{ color: " #2e7d32", marginBottom: "10px" }}>{title}</h3>
                <p><strong>Marks:</strong> {marks}/{totalMarks}</p>
                <p><strong>Percentage:</strong>{((marks / totalMarks) * 100).toFixed(2)}%</p>
                <button type="button" className="btn btn-primary" onClick={onClick}>View Details</button>
            </div>
        )
    } else {
        return (
            <div className="card">
                <h3 style={{ color: " #2e7d32", marginBottom: "10px" }}>{title}</h3>
                <p><strong>Code:</strong> {code}</p>
                <p><strong>Questions:</strong> {questionsLength}</p>
                <p><strong>Students Attempted:</strong> {resultsLength}</p>
                <button type="button" className="btn btn-primary" onClick={onClick}>View Details</button>
            </div>
        )
    }
}
