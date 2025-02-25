import React from 'react' // Import React to use JSX
import { Outlet } from 'react-router-dom' // Import Outlet to render the child routes
import Header from './Header' // Import the Header component for the Admin page
import { ThemeProvider } from '../../context/NewContext' // Import the ThemeProvider to manage theme context

function ForOutlet() {
  return (
    <>
      {/* Wrapping the whole component in ThemeProvider to provide the theme context */}
      <ThemeProvider>
        {/* Rendering the Header component in the Admin page */}
        <Header />

        {/* This is where child route components will be rendered */}
        <Outlet />
      </ThemeProvider>
    </>
  )
}

export default ForOutlet // Export the ForOutlet component to be used in other parts of the app
