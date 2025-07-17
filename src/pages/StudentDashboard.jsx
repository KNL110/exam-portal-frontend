import { Navbar } from "../components/Navbar"
import { RoleCard } from "../components/RoleCard"
import { SiteCard } from "../components/SiteCard"
import { Button } from "../components/Button"
import ProfileMenu from "../components/ProfileMenu"
import { useNavigate } from "react-router-dom"

export const StudentDashboard = () => {

    const navigate = useNavigate();

    return (
        <>
            <Navbar>
                <ProfileMenu />
            </Navbar>
            <SiteCard id="studentDashboard">
                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title">Student Dashboard</h2>
                    </div>
                    <div className="grid grid-2">
                        <RoleCard role="Take Exam" textalign="left">
                            <div className="form-group">
                                <label className="form-label">Enter Exam Code</label>
                                <input type="text" className="form-input" id="studentExamCode" placeholder="Enter exam code" />
                            </div>
                            <Button type="button" className="btn btn-success" onclick="startExam()">Start Exam</Button>
                        </RoleCard>
                        <RoleCard role="Exam History" textalign="left">
                            <Button type="button" className="btn btn-primary" onClick={() => navigate("/login/examHistory")}>View History</Button>
                        </RoleCard>
                    </div>
                </div>
            </SiteCard>
        </>
    )
}
