import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import Workshop from './pages/Workshop'

import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <Workshop/>
    }
  ])

  return (
    <div className="app">
      <Navigation />

      <main className="page-content">
        {element}
      </main>
    </div>
  )
}

export default App
