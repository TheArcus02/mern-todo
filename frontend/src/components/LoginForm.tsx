import { Link } from 'react-router-dom'

const LoginForm = () => {
  return (
    <form>
      <h1 className='text-3xl font-bold mb-5 text-center '>Login</h1>
      <div className='flex flex-col w-96'>
        <label className='label'>
          <span className='label-text'>Email</span>
        </label>
        <input
          type='text'
          placeholder='Email'
          className='input input-bordered'
        />
        <label className='label'>
          <span className='label-text'>Password</span>
        </label>
        <input
          type='password'
          placeholder='Password'
          className='input input-bordered'
        />
        <button className='btn btn-secondary mt-5'>Login</button>
        <div className='mt-5'>
          <Link to='/signup' className='text-info hover:underline'>
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </form>
  )
}

export default LoginForm
