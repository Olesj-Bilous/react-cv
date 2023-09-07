import { useState } from 'react'
import './App.css'
import './style/style.css'

import { useZustand } from './hooks/useZustand'

import { Profile } from './components/Profile'
import { DateSettingsContext } from './contexts/Date.Context'
import { Main } from './components/Main'
import { EditProfileHeader } from './components/headers/Header.Profile.Edit'
import { EditPermissionContext } from './contexts/Editable.Context'

function App() {
  const {
    id,
    img
  } = useZustand(state => state.getSelectedProfile())

  const [dateSettings] = useState({
    locales: 'nl-BE',
    present: 'heden'
  })

  const [allowEdit, setEditAllowance] = useState(true)

  return (
    <DateSettingsContext.Provider value={dateSettings}>
      <EditPermissionContext.Provider value={{ allowEdit }}>
        <button onClick={() => setEditAllowance(!allowEdit)}>Toggle edit</button>
        <button onClick={() => window.print()}>Export to PDF</button>
        <div id="document">
          <EditProfileHeader {...{
            id,
            img
          }} />
          <div className="profile-body">
            <Profile />
            <Main />
          </div>
        </div>
      </EditPermissionContext.Provider>
    </DateSettingsContext.Provider>
  )
}

export default App
