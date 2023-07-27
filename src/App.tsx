import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Header } from './components/Header'
import { useStore } from './hooks/useStore'

import { Profile } from './components/Profile'
import { DateSettingsContext } from './components/Period'
import { Main } from './components/Main'

function App() {
  const { profile: {
    firstName,
    lastName,
    profession,
    description,
    img
  }, profileSections, mainPeriods } = useStore()

  const [dateSettings] = useState({
    locales: 'en-US',
    present: 'today'
  })

  return (
    <DateSettingsContext.Provider value={dateSettings}>
      <header>
        <div className="img-ctn">
          <img src={img} width={150} />
        </div>
        <Header {...{
          title: `${firstName} ${lastName}`,
          subtitle: profession,
          introduction: description
        }} />
      </header>
      <Profile {...{
        sections: profileSections,
        order: []
      }} />
      <Main map={mainPeriods} />
    </DateSettingsContext.Provider>
  )
}

export default App
