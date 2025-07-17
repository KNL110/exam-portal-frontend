import { Navbar } from '../components/Navbar'
import { SiteCard } from '../components/SiteCard'
import { RoleCard } from '../components/RoleCard'
import { Button } from '../components/Button'
import { useNavigate } from 'react-router-dom'

export const Home = () => {

    const navigate = useNavigate();

    return (
        <>
            <Navbar>
                <Button className="btn btn-primary">
                    Register
                </Button>
            </Navbar>
            <SiteCard id="loginPage">
                <div className='card'>
                    <div class="card-header">
                        <h2 class="card-title">Welcome to Goa Testing Agency</h2>
                    </div>
                    <p style={{ marginBottom: '30px', color: '#666' }}>
                        Select your role to continue:
                    </p>
                    <div className='grid grid-2'>
                        <RoleCard 
                            role="Student"
                            message="Take exams using unique exam codes"
                            onClick={() => navigate("/login")}   
                        />
                        <RoleCard 
                            role="Professor"
                            message="Create and manage exams"
                            onClick={() => navigate("/plogin")}
                        />
                    </div>
                </div>
            </SiteCard>
        </>
    )
}
