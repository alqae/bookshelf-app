import React from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useForgotPasswordMutation, useResetPasswordMutation } from '@services/api'
import './styles.scss'

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

const ForgotPassword:React.FC<IForgotPasswordProps> = () => {
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
        return;
      }
      return navigate('/auth/sign-in')
    } catch (error) {
      console.error(error)
    }
  }

  if (token) {
    return (
      <form onSubmit={resetPasswordMethods.handleSubmit(onResetPassword)}>
        <input
          type="password"
          placeholder="Password"
          {...resetPasswordMethods.register('password')}
        />
        <br />
        <input
          type="password"
          placeholder="Confirm Password"
          {...resetPasswordMethods.register('confirmPassword')}
        />
        <br />
        <button type="submit">Reset Password</button>
      </form>
    )
  }

  return (
    <form onSubmit={forgotPasswordMethods.handleSubmit(onForgotPassword)}>
      <input
        type="email"
        placeholder="Email"
        {...forgotPasswordMethods.register('email')}
      />
      <br />
      <button type="submit">Forgot Password</button>
    </form>
  )
}

export default ForgotPassword
