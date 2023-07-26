import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { RootState } from '../redux/store'
import { useSelector } from 'react-redux'

const RequireAuth = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  const location = useLocation()

  return user ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} />
  )
}

export default RequireAuth
