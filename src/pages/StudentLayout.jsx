import { Navbar } from '../components/Navbar'
import ProfileMenu from '../components/ProfileMenu'
import { Outlet } from 'react-router-dom'

export const StudentLayout = () => {
    return (
        <>
            <Navbar>
                <ProfileMenu role="candidate"/>
            </Navbar>
            <Outlet/>
        </>
    )
}
