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
    <Route path="/">
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
  return (
    <RouterProvider router={router} fallbackElement={<span>Fallback?</span>} />
  )
}

export default App
