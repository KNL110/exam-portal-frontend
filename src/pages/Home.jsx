import { Navbar } from '../components/Navbar'
import { SiteCard } from '../components/SiteCard'
import { RoleCard } from '../components/RoleCard'
import { useNavigate } from 'react-router-dom'
import { getAuthRedirectInfo, setUserRole } from '../utils/auth'

export const Home = () => {

    const navigate = useNavigate();
    
    const redirect = (role) => {
        setUserRole(role);
        
        const { isAuth, redirectPath } = getAuthRedirectInfo(role);
        
        if (isAuth) {
            console.log(`User is already authenticated as ${role}, redirecting to dashboard`);
        } else {
            console.log(`User is not authenticated, redirecting to login`);
        }
        navigate(redirectPath);
    }

    return (
        <>
            <Navbar>
                <Button className="btn btn-primary">
                    Register
                </Button>
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
