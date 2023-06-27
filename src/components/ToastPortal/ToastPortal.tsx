import React from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import Toast, { IToastProps } from '../Toast/Toast'
import styles from './toast-portal.module.scss'
import { RootState } from '@store'

interface IToastPortalProps {
  children?: React.ReactNode
}

const ToastPortal:React.FC<IToastPortalProps> = () => {
  const toasts = useSelector<RootState, IToastProps[]>((store) => store.shared.toasts)
  const topRightToast = React.useMemo(() => toasts.filter((toast) => toast.position == 'topRight'), [toasts])
  const topLeftToast = React.useMemo(() => toasts.filter((toast) => toast.position == 'topLeft'), [toasts])
  const topCenterToast = React.useMemo(() => toasts.filter((toast) => toast.position == 'topCenter'), [toasts])
  const bottomRightToast = React.useMemo(() => toasts.filter((toast) => toast.position == 'bottomRight'), [toasts])
  const bottomLeftToast = React.useMemo(() => toasts.filter((toast) => toast.position == 'bottomLeft'), [toasts])
  const bottomCenterToast = React.useMemo(() => toasts.filter((toast) => toast.position == 'bottomCenter'), [toasts])

  return (
    <div className={styles.toast_wrapper}>
      {!!topLeftToast.length && (
        <div className={classNames(styles.toast_container, styles.top_left)}>
          {topLeftToast.map((toastProps) => <Toast key={toastProps.id} {...toastProps} />)}
        </div>
      )}

      {!!topCenterToast.length && (
        <div className={classNames(styles.toast_container, styles.top_center)}>
          {topCenterToast.map((toastProps) => <Toast key={toastProps.id} {...toastProps} />)}
        </div>
      )}

      {!!topRightToast.length && (
        <div className={classNames(styles.toast_container, styles.top_right)}>
          {topRightToast.map((toastProps) => <Toast key={toastProps.id} {...toastProps} />)}
        </div>
      )}

      {!!bottomLeftToast.length && (
        <div className={classNames(styles.toast_container, styles.bottom_left)}>
          {bottomLeftToast.map((toastProps) => <Toast key={toastProps.id} {...toastProps} />)}
        </div>
      )}

      {!!bottomCenterToast.length && (
        <div className={classNames(styles.toast_container, styles.bottom_center)}>
          {bottomCenterToast.map((toastProps) => <Toast key={toastProps.id} {...toastProps} />)}
        </div>
      )}

      {!!bottomRightToast.length && (
        <div className={classNames(styles.toast_container, styles.bottom_right)}>
          {bottomRightToast.map((toastProps) => <Toast key={toastProps.id} {...toastProps} />)}
        </div>
      )}
    </div>
  )
}

export default ToastPortal
