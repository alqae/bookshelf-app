import React from 'react'
import * as Yup from 'yup'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useForgotPasswordMutation, useResetPasswordMutation } from '@services/api'

interface IForgotPasswordProps {
  children?: React.ReactNode
}

interface ForgotPasswordForm {
  email: string
}

interface resetPasswordForm {
  password: string
  confirmPassword: string
}

const forgotPasswordFormSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
})

const resetFormSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match')
})

const ForgotPassword: React.FC<IForgotPasswordProps> = () => {
  const [searchParams] = useSearchParams()
  const [resetPassword] = useResetPasswordMutation()
  const [forgotPassword] = useForgotPasswordMutation()
  const navigate = useNavigate()
  const token = React.useMemo(() => searchParams.get('token'), [searchParams])

  const forgotPasswordMethods = useForm<ForgotPasswordForm>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(forgotPasswordFormSchema)
  })

  const resetPasswordMethods = useForm<resetPasswordForm>({
    defaultValues: {
      password: '',
      confirmPassword: ''
    },
    resolver: yupResolver(resetFormSchema)
  })

  const onForgotPassword = async (values: ForgotPasswordForm) => {
    try {
      const response = await forgotPassword(values)
      console.log(response)
      if ('error' in response) {
        return alert('Something went wrong')
      }

      alert('Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.')
      forgotPasswordMethods.reset()
      return
    } catch (error) {
      console.error(error)
    }
  }

  const onResetPassword = async (values: resetPasswordForm) => {
    if (!token) return
    try {
      const response = await resetPassword({ token, password: values.password })
      if ('error' in response) {
        alert('Something went wrong')
        return
      }
      return navigate('/auth/sign-in')
    } catch (error) {
      console.error(error)
    }
  }

  if (token) {
    return (
      <form onSubmit={resetPasswordMethods.handleSubmit(onResetPassword)} className="panel panel-dark">
        <div className="col-6 vstack gap-2">
          <h4>Reset Password</h4>

          <div className="form-floating">
            <input
              id="password"
              type="password"
              placeholder="Password"
              className={classNames(
                'form-control',
                {
                  'is-invalid': resetPasswordMethods.formState.errors.password,
                  'is-valid': !resetPasswordMethods.formState.errors.password && resetPasswordMethods.formState.dirtyFields.password,
                }
              )}
              {...resetPasswordMethods.register('password')}
            />
            <label htmlFor="password">Password</label>
            <div className="invalid-feedback">
              {resetPasswordMethods.formState.errors.password?.message}
            </div>
          </div>

          <div className="form-floating">
            <input
              id="confirm-password"
              type="password"
              placeholder="Confirm Password"

              className={classNames(
                'form-control',
                {
                  'is-invalid': resetPasswordMethods.formState.errors.confirmPassword,
                  'is-valid': !resetPasswordMethods.formState.errors.confirmPassword && resetPasswordMethods.formState.dirtyFields.confirmPassword,
                }
              )}
              {...resetPasswordMethods.register('confirmPassword')}
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="invalid-feedback">
              {resetPasswordMethods.formState.errors.confirmPassword?.message}
            </div>
          </div>

          <button className="btn btn-primary" type="submit">Reset Password</button>
        </div>
      </form>
    )
  }

  return (
    <form onSubmit={forgotPasswordMethods.handleSubmit(onForgotPassword)} className="panel panel-dark">
      <div className="col-6 vstack gap-2">
        <h4>Forgot Password</h4>

        <div className="form-floating">
          <input
            id="email"
            type="email"
            className={classNames(
              'form-control',
              {
                'is-invalid': forgotPasswordMethods.formState.errors.email,
                'is-valid': !forgotPasswordMethods.formState.errors.email && forgotPasswordMethods.formState.dirtyFields.email,
              }
            )}
            {...forgotPasswordMethods.register('email')}
          />
          <label htmlFor="email">Email</label>
          <div className="invalid-feedback">
            {forgotPasswordMethods.formState.errors.email?.message}
          </div>
        </div>

        <button className="btn btn-primary" type="submit">Forgot Password</button>
      </div>
    </form>
  )
}

export default ForgotPassword
