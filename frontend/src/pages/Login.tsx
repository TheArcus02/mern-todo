import LoginForm from '../components/LoginForm'

const Login = () => {
  return (
    <div className='min-h-screen w-full flex items-center justify-center'>
      <div className='bg-neutral p-10 rounded-xl'>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
