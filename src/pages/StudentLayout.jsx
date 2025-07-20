import { Navbar } from '../components/Navbar'
import ProfileMenu from '../components/ProfileMenu'
import { Outlet } from 'react-router-dom'
import { ExamDataProvider } from '../context/StudentContext'

export const StudentLayout = () => {
    return (
        <ExamDataProvider>
            <Navbar>
                <ProfileMenu role="candidate" />
            </Navbar>
            <Outlet />
        </ExamDataProvider>
    )
}
