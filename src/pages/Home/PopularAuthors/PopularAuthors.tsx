import React from 'react'
import classNames from 'classnames'

import styles from './popular-authors.module.scss'

interface IPopularAuthorsProps {
  children?: React.ReactNode
}

const PopularAuthors:React.FC<IPopularAuthorsProps> = () => {
  return (
    <section className={classNames(styles.pa, 'py-5')}>
      <div className="container">
        <h4 className="mb-4">Popular authors</h4>
      </div>
    </section>
  )
}

export default PopularAuthors
