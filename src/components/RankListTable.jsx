export const RanklistTable = ({ results }) => {
    if (!results.length) {
        return <p>No students have taken this exam yet.</p>;
    }

    const sortedResults = [...results].sort((a, b) => b.marks - a.marks);

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Student Name</th>
                    <th>Roll Number</th>
                    <th>Marks</th>
                </tr>
            </thead>
            <tbody>
                {sortedResults.map((result, index) => (
                    <tr key={result.studentId}>
                        <td>{index + 1}</td>
                        <td>{result.name}</td>
                        <td>{result.studentId}</td>
                        <td>{result.marks}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
