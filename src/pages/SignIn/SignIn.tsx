import React from 'react'
import * as Yup from 'yup'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, redirect, useSearchParams } from 'react-router-dom'

import { useSignInMutation, useActivateUserMutation, useAcceptInvitationMutation } from '@services/api'
import { AppDispatch, setToken } from '@store'

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

const SignIn: React.FC<ISignInProps> = () => {
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
    mode: 'all',
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
    mode: 'all',
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
        return
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
        return
      }

      clearQueryParams()
      return
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
      <form onSubmit={invitationMethods.handleSubmit(onInvitationConfirm)} className="panel panel-dark">
        <div className="col-6 vstack gap-2">
          <div>
            <h4>Welcome</h4>
            <p>We need a little more information to complete your profile</p>
          </div>

          <div className="form-floating">
            <input
              type="text"
              placeholder="First Name"
              className={classNames(
                'form-control',
                {
                  'is-invalid': invitationMethods.formState.errors.firstName,
                  'is-valid': !invitationMethods.formState.errors.firstName && invitationMethods.formState.dirtyFields.firstName,
                }
              )}
              {...invitationMethods.register('firstName')}
            />
            <label htmlFor="last-name">First Name</label>
            <div className="invalid-feedback">
              {invitationMethods.formState.errors.firstName?.message}
            </div>
          </div>

          <div className="form-floating">
            <input
              id="last-name"
              type="text"
              placeholder="Last Name"
              className={classNames(
                'form-control',
                {
                  'is-invalid': invitationMethods.formState.errors.lastName,
                  'is-valid': !invitationMethods.formState.errors.lastName && invitationMethods.formState.dirtyFields.lastName,
                }
              )}
              {...invitationMethods.register('lastName')}
            />
            <label htmlFor="last-name">Last Name</label>
            <div className="invalid-feedback">
              {invitationMethods.formState.errors.lastName?.message}
            </div>
          </div>

          <div className="form-floating">
            <input
              id="password"
              type="password"
              placeholder="Password"
              className={classNames(
                'form-control',
                {
                  'is-invalid': invitationMethods.formState.errors.password,
                  'is-valid': !invitationMethods.formState.errors.password && invitationMethods.formState.dirtyFields.password,
                }
              )}
              {...invitationMethods.register('password')}
            />
            <label htmlFor="password">Password</label>
            <div className="invalid-feedback">
              {invitationMethods.formState.errors.password?.message}
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
                  'is-invalid': invitationMethods.formState.errors.confirmPassword,
                  'is-valid': !invitationMethods.formState.errors.confirmPassword && invitationMethods.formState.dirtyFields.confirmPassword,
                }
              )}
              {...invitationMethods.register('confirmPassword')}
            />
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="invalid-feedback">
              {invitationMethods.formState.errors.confirmPassword?.message}
            </div>
          </div>

          <button className="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    )
  }

  return (
    <form onSubmit={signInMethods.handleSubmit(onSignIn)} className="panel panel-dark">
      <div className="col-6 vstack gap-2">
        <div className="d-flex justify-content-between align-items-center">
          <h4>Sign In</h4>
          <Link to="/auth/sign-up" className="link">Don't have an account? <b>create</b></Link>
        </div>

        <div className="form-floating">
          <input
            id="email"
            type="email"
            className={classNames(
              'form-control',
              {
                'is-invalid': signInMethods.formState.errors.email,
                'is-valid': !signInMethods.formState.errors.email && signInMethods.formState.dirtyFields.email,
              }
            )}
            {...signInMethods.register('email')}
          />
          <label htmlFor="email">Email</label>
          <div className="invalid-feedback">
            {signInMethods.formState.errors.email?.message}
          </div>
        </div>

        <div className="form-floating">
          <input
            id="password"
            type="password"
            className={classNames(
              'form-control',
              {
                'is-invalid': signInMethods.formState.errors.password,
                'is-valid': !signInMethods.formState.errors.password && signInMethods.formState.dirtyFields.password,
              }
            )}
            {...signInMethods.register('password')}
          />
          <label htmlFor="password">Password</label>
          <div className="invalid-feedback">
            {signInMethods.formState.errors.password?.message}
          </div>
        </div>

        <button className="btn btn-primary" type="submit">Sign In</button>

        <div className="d-flex justify-content-end">
          <Link to="/auth/forgot-password" className="link">Forgot Password?</Link>
        </div>
      </div>
    </form>
  )
}

export default SignIn
