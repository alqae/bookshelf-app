import React from 'react'
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom'
import { useSelector } from 'react-redux'

import { RootState } from './store'

import ForgotPassword from '@pages/ForgotPassword/ForgotPassword'
import SignUp from '@pages/SignUp'
import SignIn from '@pages/SignIn'
import Home from '@pages/Home/Home'

import Layout from '@components/Layout'
import ToastPortal from '@components/ToastPortal'

import '@/styles/globals.scss'
import 'animate.css/animate.css'

const AuthenticatedRoute = () => {
  const auth = useSelector<RootState>((store) => !!store.auth.token)
  return auth ? <Outlet /> : <Navigate to="/auth/sign-in" />
}

const UnauthenticatedRoute = () => {
  const auth = useSelector<RootState>((store) => !store.auth.token)
  return auth ? <Outlet /> : <Navigate to="/" />
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="auth" element={<UnauthenticatedRoute />}>
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>

      <Route path='/' element={<AuthenticatedRoute />}>
        <Route path='/' element={<Home />}/>
      </Route>
    </Route>
  )
)

function App() {
  // Ripple Effect to Buttons
  React.useEffect(() => {
    const className = 'btn'
    const ripple = document.createElement('div')
    ripple.classList.add('ripple')

    document.addEventListener('mousedown', (e) => {
      const target = e.target as Element
      if (target.classList.contains(className)) {
        ripple.setAttribute('style', `top: ${e.offsetY}px; left: ${e.offsetX}px`)
        target.appendChild(ripple)
      }
    })
  }, [])

  return (
    <>
      <RouterProvider router={router} fallbackElement={<span>Fallback?</span>} />
      <ToastPortal />
    </>
  )
}

export default App
