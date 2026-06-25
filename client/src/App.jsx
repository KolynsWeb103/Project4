import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'

import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <Home/>
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App
