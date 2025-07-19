import { Navbar } from '../components/Navbar'
import { SiteCard } from '../components/SiteCard'
import { RoleCard } from '../components/RoleCard'
import { useNavigate } from 'react-router-dom'
import { getAuthRedirectInfo, setUserRole } from '../utils/auth'

export const Home = () => {

    const navigate = useNavigate();
    
    const redirect = (role) => {
        setUserRole(role);
        const {redirectPath } = getAuthRedirectInfo(role);
        navigate(redirectPath);
    }

    return (
        <>
            <Navbar>
                <button className="btn btn-primary">
                    Register
                </button>
            </Navbar>
            <SiteCard id="loginPage">
                <div className='card'>
                    <div className="card-header">
                        <h2 className="card-title">Welcome to Goa Testing Agency</h2>
                    </div>
                    <p style={{ marginBottom: '30px', color: '#666' }}>
                        Select your role to continue:
                    </p>
                    <div className='grid grid-2'>
                        <RoleCard 
                            role="Student"
                            message="Take exams using unique exam codes"
                            onClick={() => redirect("candidate")}   
                        />
                        <RoleCard 
                            role="Professor"
                            message="Create and manage exams"
                            onClick={() => redirect("professor")}
                        />
                    </div>
                </div>
            </SiteCard>
        </>
    )
}
