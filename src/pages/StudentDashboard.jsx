import { Navbar } from "../components/Navbar"
import { RoleCard } from "../components/RoleCard"
import { SiteCard } from "../components/SiteCard"
import { Button } from "../components/Button"
import ProfileMenu from "../components/ProfileMenu"

export const StudentDashboard = () => {
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
                    <div class="grid grid-2">
                        <RoleCard role="Take Exam" center="left">
                            <div class="form-group">
                                <label class="form-label">Enter Exam Code</label>
                                <input type="text" class="form-input" id="studentExamCode" placeholder="Enter exam code" />
                            </div>
                            <Button type="button" class="btn btn-success" onclick="startExam()">Start Exam</Button>
                        </RoleCard>
                        <RoleCard role="Exam History">
                            <Button type="button" class="btn btn-primary" onclick="showStudentHistory()">View History</Button>
                        </RoleCard>
                    </div>
                </div>
            </SiteCard>
        </>
    )
}
