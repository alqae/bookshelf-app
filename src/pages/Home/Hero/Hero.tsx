import React from 'react'
import styles from './hero.module.scss'
import classNames from 'classnames'

interface IHeroProps {
  children?: React.ReactNode
}

const Hero:React.FC<IHeroProps> = () => {
  return (
    <section className={classNames(styles.banner, 'container')}>
      <h1>Reading makes the world huge</h1>

      <div className={classNames(styles.banner__content, 'row', 'gx-2')}>
        <div className="col-6">
          <div className="panel panel-search">
          <h4 className="mb-3 col-8">Find somethingto read</h4>
          <p className="mb-8 col-7">
            Fancy something unusual and unpredictable? Funny or exciting? No problem.
            Check out the collections we have prepared for you.
          </p>

          <button className="mt-auto btn btn-outline-primary">
            Browse now
          </button>
          </div>
        </div>

        <div className="col-6">
          <div className="panel panel-bod">
            {/* TODO: implement the book day */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
