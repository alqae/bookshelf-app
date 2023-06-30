import React from 'react'
import * as Yup from 'yup'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'

import { useSignUpMutation } from '@services/api'

interface ISignUpProps {
  children?: React.ReactNode
}

interface SignUpForm {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  termsAndConditions: boolean
}

const formSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('FirstName is required'),
  lastName: Yup.string()
    .required('LastName is required'),
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  termsAndConditions: Yup.boolean()
    .required('Terms and Conditions is required')
})

const SignUp: React.FC<ISignUpProps> = () => {
  const [signUp] = useSignUpMutation()
  const navigate = useNavigate()

  const methods = useForm<SignUpForm>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAndConditions: false
    },
    mode: 'all',
    resolver: yupResolver(formSchema)
  })

  const onSubmit = async (values: SignUpForm) => {
    const response = await signUp({
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password
    })
    if ('error' in response) return
    return navigate('/auth/sign-in')
  }

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className="panel panel-dark">
      <div className="col-6 vstack gap-2">
      <div className="d-flex justify-content-between align-items-center">
          <h4>Sign Up</h4>
          <Link to="/auth/sign-in" className="link">Alredy have an account? <b>Sign in</b></Link>
        </div>

        <div className="form-floating">
          <input
            id="firstName"
            type="text"
            placeholder="First Name"
            className={classNames(
              'form-control',
              {
                'is-invalid': methods.formState.errors.firstName,
                'is-valid': !methods.formState.errors.firstName && methods.formState.dirtyFields.firstName,
              }
            )}
            {...methods.register('firstName')}
          />
          <label htmlFor="firstName">FirstName</label>
          <div className="invalid-feedback">
            {methods.formState.errors.firstName?.message}
          </div>
        </div>

        <div className="form-floating">
          <input
            id="lastName"
            type="text"
            placeholder="Last Name"
            className={classNames(
              'form-control',
              {
                'is-invalid': methods.formState.errors.lastName,
                'is-valid': !methods.formState.errors.lastName && methods.formState.dirtyFields.lastName,
              }
            )}
            {...methods.register('lastName')}
          />
          <label htmlFor="lastName">LastName</label>
          <div className="invalid-feedback">
            {methods.formState.errors.lastName?.message}
          </div>
        </div>

        <div className="form-floating">
          <input
            id="email"
            type="email"
            placeholder="Email"
            className={classNames(
              'form-control',
              {
                'is-invalid': methods.formState.errors.email,
                'is-valid': !methods.formState.errors.email && methods.formState.dirtyFields.email,
              }
            )}
            {...methods.register('email')}
          />
          <label htmlFor="email">Email</label>
          <div className="invalid-feedback">
            {methods.formState.errors.email?.message}
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
                'is-invalid': methods.formState.errors.password,
                'is-valid': !methods.formState.errors.password && methods.formState.dirtyFields.password,
              }
            )}
            {...methods.register('password')}
          />
          <label htmlFor="password">Password</label>
          <div className="invalid-feedback">
            {methods.formState.errors.password?.message}
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
                'is-invalid': methods.formState.errors.confirmPassword,
                'is-valid': !methods.formState.errors.confirmPassword && methods.formState.dirtyFields.confirmPassword,
              }
            )}
            {...methods.register('confirmPassword')}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="invalid-feedback">
            {methods.formState.errors.confirmPassword?.message}
          </div>
        </div>

        <button className="btn btn-primary" type="submit">Sign Up</button>
      </div>
    </form>
  )
}

export default SignUp
