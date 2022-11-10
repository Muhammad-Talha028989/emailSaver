import { useState } from 'react'
import './App.css'
import Home from './assets/components/Home.components/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import GetPersonalForm from './assets/components/GetPersonalInfo/GetPersonal.form'
import PersonalInfoForm from './assets/components/EmailProtection/Personal.info.form'

function App (): JSX.Element
{
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={ <Home /> }>
            <Route path='/' element={ <PersonalInfoForm /> } />
            <Route path='/get-personal-data' element={ <GetPersonalForm /> } />
          </Route>
        </Routes>

      </div>
    </Router>

  )
}

export default App
