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

  const downloadImg = (url, fileName) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a temporary anchor element
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = fileName

        // Append the anchor to the document body
        document.body.appendChild(link)

        // Simulate a click event to trigger the download
        link.click()

        // Remove the anchor from the document body
        document.body.removeChild(link)
      })
      .catch((error) => {
        console.error('Error downloading image:', error)
      })
  }

  return (
    <AppContext.Provider
      value={{
        isDarkTheme,
        toggleDarkTheme,
        searchTerm,
        setSearchTerm,
        downloadImg,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => useContext(AppContext)
