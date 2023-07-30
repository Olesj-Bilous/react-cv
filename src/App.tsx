import { useState } from 'react'
import './App.css'

import { Header, HeaderLevelContext } from './components/Header'
import { useZustand } from './hooks/useZustand'

import { Profile } from './components/Profile'
import { DateSettingsContext } from './components/Period'
import { Main } from './components/Main'
import { ProfileHeader } from './components/Header.Profile'

function App() {
  const {
    id,
    img
  } = useZustand(state => state.getSelectedProfile())

  const [dateSettings] = useState({
    locales: 'en-US',
    present: 'present'
  })

  return (
    <DateSettingsContext.Provider value={dateSettings}>
      <ProfileHeader {...{
        id,
        img
      }} />
      <Profile />
      <Main />
    </DateSettingsContext.Provider>
  )
}

export default App
