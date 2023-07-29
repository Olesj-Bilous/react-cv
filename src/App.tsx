import { useState } from 'react'
import './App.css'

import { Header, HeaderLevelContext } from './components/Header'
import { useZustand } from './hooks/useStore'

import { Profile } from './components/Profile'
import { DateSettingsContext } from './components/Period'
import { Main } from './components/Main'

function App() {
  const {
    firstName,
    lastName,
    profession,
    description,
    img
  } = useZustand(state => state.getSelectedProfile())

  const [dateSettings] = useState({
    locales: 'en-US',
    present: 'present'
  })

  return (
    <DateSettingsContext.Provider value={dateSettings}>
      <HeaderLevelContext.Provider value={{level: 1}}>
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
      </HeaderLevelContext.Provider>
      <Profile order={[]} />
      <Main />
    </DateSettingsContext.Provider>
  )
}

export default App
