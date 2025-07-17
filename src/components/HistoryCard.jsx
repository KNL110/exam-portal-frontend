import React from 'react'
import { Button } from './Button'
import { useNavigate } from 'react-router-dom'

export const HistoryCard = ({ title, marks, totalMarks }) => {

    const navigate = useNavigate();

    return (
        <div class="card">
            <h3 style={{ color: " #2e7d32", marginBottom: "10px" }}>{title}</h3>
            <p><strong>Marks:</strong> {marks}/{totalMarks}</p>
            <p><strong>Percentage:</strong>{((marks / totalMarks) * 100).toFixed(2)}%</p>
            <Button type="button" class="btn btn-primary" onClick={() => navigate("/login")}>View Details</Button>
        </div>
    )
}
