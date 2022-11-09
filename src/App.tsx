import { useState } from 'react'
import './App.css'
import Home from './assets/components/Home.components/Home'

function App (): JSX.Element
{
  const [ count, setCount ] = useState( 0 )

  return (
    <div className="App">
      <Home />
    </div>
  )
}

export default App
