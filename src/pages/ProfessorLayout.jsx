import { Navbar } from '../components/Navbar'
import ProfileMenu from '../components/ProfileMenu'
import { Outlet } from 'react-router-dom'
import { ExamDataProvider } from '../context/ProfessorContext'

export const ProfessorLayout = () => {

    return (
        <ExamDataProvider>
            <Navbar>
                <ProfileMenu role="professor" />
            </Navbar>
            <Outlet />
        </ExamDataProvider>
    )
}
