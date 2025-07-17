import React from 'react'
import { Navbar } from '../components/Navbar'
import ProfileMenu from '../components/ProfileMenu'
import { SiteCard } from '../components/SiteCard'

export const Response = () => {

    let sh = { examId: 1, title: "Physics Mock Test", marks: 7, totalMarks: 8 }
    
    return (
        <>
            <Navbar>
                <ProfileMenu />
            </Navbar>
            <SiteCard id="resultsPage">
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Exam Results</h2>
                    </div>
                    <div id="resultsContent">
                        <div class="stats-grid">
                            <div class="stat-card">
                                <div class="stat-value">{sh.marks}</div>
                                <div class="stat-label">Your Marks</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-value">{sh.totalMarks}</div>
                                <div class="stat-label">Total Marks</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-value">{(sh.marks/sh.totalMarks)*100}%</div>
                                <div class="stat-label">Percentage</div>
                            </div>
                        </div>

                    </div>
                    <button type="button" class="btn" onclick="showStudentView()">Back to Dashboard</button>
                </div>
            </SiteCard>
        </>
    )
}
