import { Navbar } from '../components/Navbar'
import ProfileMenu from '../components/ProfileMenu'
import { Outlet } from 'react-router-dom'

export const ProfessorLayout = () => {
    return (
        <>
            <Navbar>
                <ProfileMenu />
            </Navbar>
            <Outlet/>
        </>
    )
}
