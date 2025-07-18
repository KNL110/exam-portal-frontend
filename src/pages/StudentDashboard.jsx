import { useState } from "react"
import { RoleCard } from "../components/RoleCard"
import { SiteCard } from "../components/SiteCard"
import { Button } from "../components/Button"
import { useNavigate } from "react-router-dom"

export const StudentDashboard = () => {

    const navigate = useNavigate();
    const [examCode, setExamCode] = useState(""); //exam code refers to exam id

    const startExam = async () => {
        if (!examCode.trim()) {
            alert('Please enter an exam code');
            return;
        }

        const token = localStorage.getItem('accessToken');
        if (!token) {
            alert('Please log in first to take an exam');
            navigate('/login');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/v1/exam/getExam/${examCode}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                navigate(`/student/exam/${examCode}`);
            } else if (response.status === 401) {
                alert('Your session has expired. Please log in again.');
                localStorage.removeItem('accessToken');
                navigate('/login');
            } else {
                const error = await response.json();
                alert(error.message || 'Exam not found or you are not authorized to take this exam');
            }
        } catch (error) {
            console.error('Error fetching exam:', error);
            alert('Error loading exam');
        }
    };

    return (
        <SiteCard id="studentDashboard">
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Student Dashboard</h2>
                </div>
                <div className="grid grid-2">
                    <RoleCard role="Take Exam" textalign="left">
                        <div className="form-group">
                            <label className="form-label">Enter Exam Code</label>
                            <input type="text" className="form-input" id="studentExamCode" placeholder="Enter exam code" value={examCode} onChange={(e) => setExamCode(e.target.value)} />
                        </div>
                        <Button type="button" className="btn btn-success" onClick={startExam}>Start Exam</Button>
                    </RoleCard>
                    <RoleCard role="Exam History" textalign="left">
                        <Button type="button" className="btn btn-primary" onClick={() => navigate("/student/examHistory")}>View History</Button>
                    </RoleCard>
                </div>
            </div>
        </SiteCard>
    )
}
