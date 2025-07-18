import { SiteCard } from '../components/SiteCard'
import { Button } from '../components/Button'
import { useNavigate } from 'react-router-dom'

export const ProfessorDashboard = () => {

    const navigate = useNavigate();

    return (
        <SiteCard id="professorDashboard">
            <div className='card'>
                <div className="card-header">
                    <h2 className="card-title">Professor Dashboard</h2>
                </div>
                <div className="grid grid-3">
                    <Button className="btn btn-success" onclick="showCreateExam()">Create New Exam</Button>
                    <Button className="btn btn-primary" onClick={()=> navigate("/professor/examHistory")}>Exam History</Button>
                </div>
            </div>
        </SiteCard>
    )
}
