import React from 'react'
import * as Yup from 'yup'
import { AppDispatch, setToken } from '@store'
import { Link, redirect, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useSignInMutation, useActivateUserMutation, useAcceptInvitationMutation } from '@services/api'
import { yupResolver } from '@hookform/resolvers/yup'

import './styles.scss'

interface ISignInProps {
  children?: React.ReactNode
}

interface SignInForm {
  email: string
  password: string
}

interface InvitationForm {
  firstName: string
  lastName: string
  password: string
  confirmPassword: string
}

enum TOKEN_TYPE {
  CONFIRMATION = 'VERIFY_EMAIL',
  INVITATION = 'INVITE_USER'
}

const signInFormSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
})

const invitationFormSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First Name is required'),
  lastName: Yup.string()
    .required('Last Name is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match')
})

const SignIn:React.FC<ISignInProps> = () => {
  const [signIn] = useSignInMutation()
  const [activateUser] = useActivateUserMutation()
  const [acceptInvitation] = useAcceptInvitationMutation()
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch<AppDispatch>()

  const token = React.useMemo(() => searchParams.get('token'), [searchParams])
  const type = React.useMemo(() => searchParams.get('type'), [searchParams])

  const signInMethods = useForm<SignInForm>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(signInFormSchema)
  })
  
  const onSignIn = async (values: SignInForm) => {
    try {
      const response = await signIn(values)
      if ('data' in response) {
        dispatch(setToken(response.data.token))
        redirect('/')
      } else if ('error' in response) {
        throw new Error('Unathorized')
      }

      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const invitationMethods = useForm<InvitationForm>({
    defaultValues: {
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: ''
    },
    resolver: yupResolver(invitationFormSchema)
  })

  const onInvitationConfirm = async (values: InvitationForm) => {
    try {
      if (!token) return
      const response = await acceptInvitation({
        ...values,
        token,
      })

      if ('error' in response) {
        alert(response.error)
        return;
      }

      clearQueryParams()
      invitationMethods.reset()
    } catch (error) {
      console.log(error)
    }
  }

  const onVerify = async () => {
    try {
      if (!token) return
      const response = await activateUser(token)
      if ('error' in response) {
        alert(response.error)
        return;
      }

      clearQueryParams()
      return;
    } catch (error) {
      console.log(error)
    }
  }

  const clearQueryParams = () => {
    searchParams.delete('token')
    searchParams.delete('type')
    setSearchParams(searchParams)
  }

  React.useEffect(() => {
    if (token && type && type === TOKEN_TYPE.CONFIRMATION) {
      onVerify()
    }
  }, [token, type])
   
  if (token && type && type === TOKEN_TYPE.INVITATION) {
    return (
      <form onSubmit={invitationMethods.handleSubmit(onInvitationConfirm)}>
        <input
          type="text"
          placeholder="First Name"
          {...invitationMethods.register('firstName')}
        />
        <br />
        <input
          type="text"
          placeholder="Last Name"
          {...invitationMethods.register('lastName')}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          {...invitationMethods.register('password')}
        />
        <br />
        <input
          type="password"
          placeholder="Confirm Password"
          {...invitationMethods.register('confirmPassword')}
        />
        <br />
        <button type="submit">Confirm</button>
      </form>
    )
  }

  return (
    <form onSubmit={signInMethods.handleSubmit(onSignIn)}>
      <input
        type="email"
        placeholder="Email"
        {...signInMethods.register('email')}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        {...signInMethods.register('password')}
      /> 
      <br />
      <button type="submit">Sign In</button>
      <br />
      <Link to="/auth/sign-up">Don't have an account? create</Link>
      <br />
      <Link to="/auth/forgot-password">Forgot Password?</Link>
    </form>
  )
}

export default SignIn
