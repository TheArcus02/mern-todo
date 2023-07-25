import { Link } from 'react-router-dom'

const SignupForm = () => {
  return (
    <form>
      <h1 className='text-3xl font-bold mb-5 text-center '>Signup</h1>
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
          <Link to='/login' className='text-info hover:underline'>
            Already have an account? Login
          </Link>
        </div>
      </div>
    </form>
  )
}

export default SignupForm
