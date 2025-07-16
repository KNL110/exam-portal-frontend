import React from 'react'
import { Navbar } from '../components/Navbar'
import { SiteCard } from '../components/SiteCard'
import { Button } from '../components/Button'
import ProfileMenu from '../components/ProfileMenu'

export const ProfessorDashboard = () => {
    return (
        <>
            <Navbar>
                <ProfileMenu />
            </Navbar>
            <SiteCard id="professorDashboard">
                <div className='card'>
                    <div class="card-header">
                        <h2 class="card-title">Professor Dashboard</h2>
                    </div>
                    <div class="grid grid-3">
                        <Button class="btn btn-success" onclick="showCreateExam()">Create New Exam</Button>
                        <Button class="btn btn-primary" onclick="showExamHistory()">Exam History</Button>
                        <Button class="btn btn-secondary" onclick="showLogin()">Logout</Button>
                    </div>
                </div>
            </SiteCard>
        </>
    )
}
