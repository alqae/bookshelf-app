import { RootState } from '@/store'
import { useSelector } from 'react-redux'

export const useAuthenticated = () => {
  const isAuth = useSelector<RootState>((state) => !!state.auth.token)
  return isAuth
}
