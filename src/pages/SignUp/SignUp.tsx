import React from 'react'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'

import './styles.scss'
import { useSignUpMutation } from '@services/api'

interface ISignUpProps {
  children?: React.ReactNode
}

interface SignUpForm {
  firstName: string
  lastName: string
  email: string
  password: string
  // termsAndConditions: boolean
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
    // .min(8, 'Password length should be at least 8 characters')
    .max(12, 'Password cannot exceed more than 12 characters'),
})

const SignUp:React.FC<ISignUpProps> = () => {
  const [signUp] = useSignUpMutation()
  const navigate = useNavigate()

  const methods = useForm<SignUpForm>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      // termsAndConditions: false
    },
    resolver: yupResolver(formSchema)
  })

  const onSubmit = async (values: SignUpForm) => {
    try {
      const response = await signUp(values)
      if ('error' in response) {
        return alert('Something went wrong')
      }
      return navigate('/auth/sign-in')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="First Name"
        {...methods.register('firstName')}
      />
      <br />
      <input
        type="text"
        placeholder="Last Name"
        {...methods.register('lastName')}
      />
      <br />
      <input
        type="email"
        placeholder="Email"
        {...methods.register('email')}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        {...methods.register('password')}
      />
      <br />
      <button type="submit">Sign Up</button>
      <br />
      <Link to="/auth/sign-in">Already have account?</Link>
    </form>
  )
}

export default SignUp
