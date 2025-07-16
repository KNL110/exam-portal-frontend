import React from 'react'
// import "../styles/home.css"
import { Navbar } from '../components/Navbar'
import { SiteCard } from '../components/SiteCard'
import { RoleCard } from '../components/RoleCard'
import { Button } from '../components/Button'

export const Home = () => {
    return (
        <>
            <Navbar>
                <Button className="btn btn-primary" onclick="showLogin()">
                    Register
                </Button>
            </Navbar>
            <SiteCard>
                <div className='card'>
                    <div class="card-header">
                        <h2 class="card-title">Welcome to Goa Testing Agency</h2>
                    </div>
                    <p style={{ marginBottom: '30px', color: '#666' }}>
                        Select your role to continue:
                    </p>
                    <div className='grid grid-2'>
                        <RoleCard role="Student" message="Take exams using unique exam codes"/>
                        <RoleCard role="Professor" message="Create and manage exams"/>
                    </div>
                </div>
            </SiteCard>
        </>
    )
}
