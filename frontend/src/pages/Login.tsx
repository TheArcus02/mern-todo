import { useSelector } from 'react-redux'
import LoginForm from '../components/LoginForm'
import { RootState } from '../redux/store'
import { Navigate } from 'react-router-dom'

const Login = () => {
  const user = useSelector((state: RootState) => state.auth.user)

  return !user ? (
    <div className='mt-10 md:mt-48 w-full flex items-center justify-center'>
      <div className='bg-neutral p-10 rounded-xl'>
        <LoginForm />
      </div>
    </div>
  ) : (
    <Navigate to='/todos' />
  )
}

export default Login
