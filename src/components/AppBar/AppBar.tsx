import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { BiBookmark } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { AiOutlineSearch, AiOutlineShopping } from 'react-icons/ai'

import { useAuthenticated } from '@hooks/authenticated.hook'
import styles from './app-bar.module.scss'
import Logo from '@assets/logo.svg'

interface IAppBarProps {
  children?: React.ReactNode
}

const AppBar: React.FC<IAppBarProps> = () => {
  const isAuthenticated = useAuthenticated()
  const navigate = useNavigate()

  return (
    <header className={classNames(styles.appbar, 'navbar')}>
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={Logo} />
        </Link>

        <nav className={classNames('navbar-nav', styles.appbar__links)}>
          <Link className="nav-link" to="/">Books</Link>
          <Link className="nav-link" to="/">Authors</Link>
          <Link className="nav-link" to="/">What to Read?</Link>
          <Link className="nav-link" to="/">Gift Ideas</Link>
          <Link className="nav-link" to="/">About Us</Link>
        </nav>

        <div className={styles.appbar__actions}>
          <div className={classNames({ 'me-3': !isAuthenticated })}>
            <button>
              <AiOutlineSearch className="me-1" />
            </button>

            <button>
              <BiBookmark className="me-1" />
            </button>

            <button>
              <AiOutlineShopping />
            </button>
          </div>

          {!isAuthenticated && (
            <button className="btn btn-primary" onClick={() => navigate("/auth/sign-in")}>LOGIN</button>
          )}
        </div>
      </div>
    </header>
  )
}

export default AppBar