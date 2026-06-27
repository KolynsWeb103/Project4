import React from 'react'
import '../App.css'
import '../css/Navigation.css'

const Navigation = () => {
    return (
    <nav>
        <ul>
        <li>
            <h1>MHFU Gear Workshop 🛡️</h1>
            <div className="nav-subtitle">
                <span>Data sources:</span>
                <a
                    href="https://github.com/Kolyn090/mhfu-db"
                    target="_blank"
                    rel="noreferrer"
                >
                    https://github.com/Kolyn090/mhfu-db
                </a>
                <span>·</span>
                <a
                    href="https://github.com/vallode/mhfu-blacksmith.git"
                    target="_blank"
                    rel="noreferrer"
                >
                    mhfu-blacksmith
                </a>
                </div>
        </li>
        </ul>

        <ul>
        <li><a href='/' role='button'>Workshop</a></li>
        <li><a href='/gears' role='button'>View Gears</a></li>
        </ul>
    </nav>
    )
}

export default Navigation
