import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { AiOutlineInstagram, AiOutlineFacebook, AiOutlineTwitter } from 'react-icons/ai'

import styles from './footer.module.scss'
import Logo from '@assets/logo.svg'

interface IFooterProps {
  children?: React.ReactNode
}

const Footer:React.FC<IFooterProps> = () => {
  return (
    <footer className={styles.footer}>
      <div className={classNames('container', styles.footer__banner)}>
        <img src={Logo} />

        <div className={styles.footer__actions}>
          <button>
            <AiOutlineInstagram className="fs-5" />
          </button>
          <button>
            <AiOutlineFacebook className="fs-5" />
          </button>
          <button>
            <AiOutlineTwitter className="fs-5" />
          </button>
        </div>
      </div>

      <div className={styles.footer__terms_and_policy}>
        <div className="container">
          <Link to="/" className="me-2">Terms and conditions</Link>
          <Link to="/">Privacy policy</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
