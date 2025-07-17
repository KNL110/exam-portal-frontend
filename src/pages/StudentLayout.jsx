import React from 'react'
import { Navbar } from '../components/Navbar'
import ProfileMenu from '../components/ProfileMenu'
import { Outlet } from 'react-router-dom'

export const StudentLayout = () => {
    return (
        <>
            <Navbar>
                <ProfileMenu/>
            </Navbar>
            <Outlet/>
        </>
    )
}
