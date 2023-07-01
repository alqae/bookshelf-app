import React from 'react'
import { Outlet } from 'react-router-dom'

import AppBar from '../AppBar/AppBar'
import Footer from '../Footer'

interface ILayoutProps {
  children?: React.ReactNode
}

const Layout:React.FC<ILayoutProps> = () => {
  return (
    <>
      <AppBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
