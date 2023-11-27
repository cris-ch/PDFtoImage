import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FileUpload from '../components/FileUpload'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Choose your File To Make Interactive</h1>
      <FileUpload />
    </>
  )
}

export default App
