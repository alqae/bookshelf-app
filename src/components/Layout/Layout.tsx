import React from 'react'
import { Outlet } from 'react-router-dom'

import styles from './layout.module.scss'
import AppBar from '../AppBar/AppBar'
import Footer from '../Footer'

interface ILayoutProps {
  children?: React.ReactNode
}

const Layout:React.FC<ILayoutProps> = () => {
  return (
    <>
      <AppBar />
      <main className={styles.layout}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
