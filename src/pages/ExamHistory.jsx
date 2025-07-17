import React from 'react'
import { SiteCard } from '../components/SiteCard'
import { Button } from '../components/Button'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import ProfileMenu from "../components/ProfileMenu"
import { HistoryCard } from '../components/HistoryCard'

export const ExamHistory = () => {
    let studentHistory = [
        { examId: 1, title: "Physics Mock Test", marks: 7, totalMarks: 8 }
    ];
    const navigate = useNavigate();
    return (
        <>
            <Navbar>
                <ProfileMenu />
            </Navbar>
            <SiteCard id="studentHistoryPage">
                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title">My Exam History</h2>
                    </div>
                    <div id="studentHistoryList">
                        <HistoryCard
                            title={studentHistory[0].title}
                            marks={studentHistory[0].marks}
                            totalMarks={studentHistory[0].totalMarks}
                            onClick={()=> navigate("/login/examHistory/response")}
                        />
                    </div>
                    <Button type="button" className="btn" onClick={() => navigate("/login")}>Back to Dashboard</Button>
                </div>
            </SiteCard>
        </>
    )
}
