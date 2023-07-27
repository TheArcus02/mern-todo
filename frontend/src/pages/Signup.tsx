import { Navigate } from 'react-router-dom'
import SignupForm from '../components/SignupForm'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const Signup = () => {
  const user = useSelector((state: RootState) => state.auth.user)

  return !user ? (
    <div className='mt-10 md:mt-48 w-full flex items-center justify-center'>
      <div className='bg-neutral p-10 rounded-xl'>
        <SignupForm />
      </div>
    </div>
  ) : (
    <Navigate to='/todos' />
  )
}

export default Signup
