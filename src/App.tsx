import { useEffect, useContext } from 'react'
import './App.css'
import { Routes } from './useRoutes'
import { localStorageEventTaget } from './utils'
import { Theme } from './hook'

function App() {
  const { reset } = useContext(Theme)
  useEffect(() => {
    localStorageEventTaget.addEventListener('clearLS', () => reset)
    return () => localStorageEventTaget.removeEventListener('clearLS', reset)
  }, [reset])
  return (
    <div className='w-full'>{Routes()}</div>
  )
}

export default App
