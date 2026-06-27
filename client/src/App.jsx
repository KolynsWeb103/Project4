import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import Workshop from './pages/Workshop'
import ViewGears from './pages/ViewGears'
import GearSetDetail from './pages/GearSetDetail'

import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <Workshop/>
    },
    {
      path: '/gears',
      element: <ViewGears />
    },
    {
      path: '/gears/:gearSetId',
      element: <GearSetDetail />
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
