import React, { useState } from 'react'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { IconBaseProps } from 'react-icons'
import {
  AiOutlineCheckCircle,
  AiOutlineInfoCircle,
  AiOutlineWarning,
  AiOutlineExclamationCircle
} from 'react-icons/ai'

import { AppDispatch, removeToast } from '@/store'

export interface IToastProps {
  variant: 'success' | 'info' | 'danger' | 'warning'
  id: string
  text: string
  position: 'topLeft' | 'topRight' | 'topCenter' | 'bottomLeft' | 'bottomRight' | 'bottomCenter'
}

const Toast:React.FC<IToastProps> = ({
  variant = 'info',
  text,
  id,
  position
}) => {
  const dispatch = useDispatch<AppDispatch>()

  const Icon: React.FC<IconBaseProps> = (props) => {
    switch (variant) {
      case 'danger':
        return <AiOutlineExclamationCircle {...props} />
      case 'success':
        return <AiOutlineCheckCircle {...props} />
      case 'warning':
        return <AiOutlineWarning {...props} />
    
      case 'info':
      default:
        return <AiOutlineInfoCircle {...props} />
    }
  }

  const getTransitionClasses = (): [string, string] => {
    switch (position) {
      case 'topLeft':
        return ['animate__backInLeft', 'animate__backOutLeft']
      case 'topCenter':
        return ['animate__backInDown', 'animate__backOutUp']
      case 'topRight':
        return ['animate__backInRight', 'animate__backOutRight']
      case 'bottomLeft':
        return ['animate__backInLeft', 'animate__backOutLeft']
      case 'bottomCenter':
        return ['animate__backInUp', 'animate__backOutDown']
      case 'bottomRight':
      default:
        return ['animate__backInRight', 'animate__backOutRight']
    }
  }

  const timeout = 5000

  const [classes, setClasses] = useState([
    {
      [`alert-${variant}`]: variant != 'info',
      ['alert-primary']: variant == 'info'
    },
    'animate__animated',
    'alert',
    'd-flex',
    'align-items-center',
    'invisible',
  ])

  React.useEffect(() => {
    const [startTransitionClass, endTransitionClass] = getTransitionClasses()
    classes.pop()
    setClasses(classes)
    setClasses(classes.concat(startTransitionClass))
    const timer = setTimeout(() => {
      setClasses(classes.filter((className) => className != startTransitionClass))
      setClasses(classes.concat(endTransitionClass))
      setTimeout(() => {
        dispatch(removeToast(id))
      }, 1000)
    }, timeout)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className={classNames(classes)} role="alert">
      <Icon className="me-2" size={24} />
      <div>{text}</div>
    </div>
  )
}

export default Toast
