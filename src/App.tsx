import { useState } from 'react'
import './App.css'
import './style/style.css'

import { useZustand } from './hooks/useZustand'

import { Profile } from './components/Profile'
import { DateSettingsContext } from './components/items/Period'
import { Main } from './components/Main'
import { EditProfileHeader } from './components/headers/Header.Profile.Edit'
import { EditPermissionContext } from './contexts/EditContext'

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
      <EditPermissionContext.Provider value={{allowEdit:true}}>
        <EditProfileHeader {...{
          id,
          img
        }} />
        <Profile />
        <Main />
      </EditPermissionContext.Provider>
    </DateSettingsContext.Provider>
  )
}

export default App
