import { createContext, useContext, useState, useEffect } from 'react'
import './index.css'

const AppContext = createContext()

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches
  const storedDarkMode = localStorage.getItem('darkTheme') === 'true'
  if (storedDarkMode !== undefined) {
    return storedDarkMode
  } else return { prefersDarkMode }
}
const newVar = getInitialDarkMode()
console.log(`prefer: ${newVar}`)
export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode())
  const [searchTerm, setSearchTerm] = useState('cat')

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setIsDarkTheme(newDarkTheme)
    const storeDarkMode = localStorage.setItem('darkTheme', newDarkTheme)
  }

  useEffect(() => {
    //this code add dark-theme class to body when isDarkTheme is true else removes the dark-theme class from body
    document.body.classList.toggle('dark-theme', isDarkTheme)
  }, [isDarkTheme])

  console.log(`darkmode:${isDarkTheme}`)

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => useContext(AppContext)
