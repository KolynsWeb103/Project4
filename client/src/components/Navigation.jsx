import React from 'react'
import '../App.css'
import '../css/Navigation.css'

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><h1>MHFU Gear Workshop 🛡️</h1></li>
            </ul>

            <ul>
                <li><a href='/' role='button'>Workshop</a></li>
                <li><a href='/customcars' role='button'>View Gears</a></li>
            </ul>
            
        </nav>
    )
}

export default Navigation
