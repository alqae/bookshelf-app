import React from 'react'
import classNames from 'classnames'
import { HiArrowDownRight } from 'react-icons/hi2'

import styles from './what-to-read.module.scss'

interface IWhatToReadProps {
  children?: React.ReactNode
}

const WhatToRead:React.FC<IWhatToReadProps> = () => {
  return (
    <section className="m-3">
      <div className="panel panel-question container d-flex justify-content-between">
        <div className="mb-4">
          <h4 className="mb-2 col-7">Deciding what to read next?</h4>
          <p className="col-5">
            You’re in the right place. Tell us what titles or genres you’ve enjoyed in the past,
            and we’ll give you surprisingly insightful recommendations.
          </p>
        </div>

        <button className={classNames(styles.wtr__cta, 'btn btn-primary')}>
          <HiArrowDownRight />
        </button>
      </div>
    </section>
  )
}

export default WhatToRead
