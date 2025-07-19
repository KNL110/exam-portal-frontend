import { SiteCard } from '../components/SiteCard'
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
                    <button className="btn btn-success" onClick={()=> navigate("/professor/creatExam")}>Create New Exam</button>
                    <button className="btn btn-primary" onClick={()=> navigate("/professor/examHistory")}>Exam History</button>
                </div>
            </div>
        </SiteCard>
    )
}
