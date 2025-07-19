import { SiteCard } from '../components/SiteCard'
import { useNavigate } from 'react-router-dom'
import { examDataApi } from '../api/examDataApi'
import { useEffect } from 'react'
import { examResultApi } from '../api/examResultApi'
import { useExamData } from '../context/examDataContext'

export const ProfessorDashboard = () => {

    const navigate = useNavigate();
    const { setExamData, setResponseData } = useExamData();

    useEffect(() => {
        const fetchexam = async () => {
            const exams = await examDataApi();
            const responses = await examResultApi();
            setExamData(exams);
            setResponseData(responses);
        }
        fetchexam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <SiteCard id="professorDashboard">
            <div className='card'>
                <div className="card-header">
                    <h2 className="card-title">Professor Dashboard</h2>
                </div>
                <div className="grid grid-3">
                    <button className="btn btn-success" onClick={() => navigate("/professor/creatExam")}>Create New Exam</button>
                    <button className="btn btn-primary" onClick={() => navigate("/professor/examHistory")}>Exam History</button>
                </div>
            </div>
        </SiteCard>
    )
}
