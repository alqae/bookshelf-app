import React from 'react'
import styles from './best-sellers.module.scss'

import classNames from 'classnames'

interface IBestSellersProps {
  children?: React.ReactNode
}

const BestSellers:React.FC<IBestSellersProps> = () => {
  return (
    <section className={classNames(styles.bs, 'py-5')}>
      <div className="container">
        <h4 className="mb-4">Bestsellers</h4>
      </div>
    </section>
  )
}

export default BestSellers
