import React from 'react'
// import "../styles/home.css"
import { Navbar } from '../components/Navbar'
import { SiteCard } from '../components/SiteCard'

export const Home = () => {
    return (
        <>
            <Navbar />
            <SiteCard>
                <div className='card'>
                    <div class="card-header">
                        <h2 class="card-title">Welcome to Goa Testing Agency</h2>
                    </div>
                </div>
            </SiteCard>
        </>
    )
}
