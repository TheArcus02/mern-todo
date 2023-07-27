import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserInterface } from '../interfaces/interfaces'
import { login } from '../redux/authSlice'
import { z } from 'zod'
import Loading from './Loading'

const SignupValidator = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6, { message: 'Password is too short' }),
})

type SignupValidatorType = z.infer<typeof SignupValidator>

const SignupForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupValidatorType>({
    resolver: zodResolver(SignupValidator),
  })

  const { mutate: signupHandler, isLoading } = useMutation({
    mutationFn: async ({ email, password }: SignupValidatorType) => {
      const { data } = await axios.post(
        'http://localhost:8080/api/user/signup',
        { email, password },
      )
      return data as UserInterface
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
      dispatch(login(data))
      toast.success('Signup successful 🎉')
      navigate('/todos')
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || error.message)
        console.log(error)
      }
    },
  })

  useEffect(() => {
    if (errors) {
      toast.error(errors.email?.message || errors.password?.message)
    }
  }, [errors])

  return !isLoading ? (
    <form onSubmit={handleSubmit((data) => signupHandler(data))}>
      <h1 className='text-3xl font-bold mb-5 text-center '>Signup</h1>
      <div className='flex flex-col sm:w-96'>
        <label className='label'>
          <span className='label-text'>Email</span>
        </label>
        <input
          type='text'
          placeholder='Email'
          className='input input-bordered'
          autoFocus
          {...register('email')}
        />
        <label className='label'>
          <span className='label-text'>Password</span>
        </label>
        <input
          type='password'
          placeholder='Password'
          className='input input-bordered'
          {...register('password')}
        />
        <button className='btn btn-secondary mt-5'>Login</button>
        <div className='mt-5'>
          <Link to='/login' className='text-info hover:underline'>
            Already have an account? Login
          </Link>
        </div>
      </div>
    </form>
  ) : (
    <div className=' min-w-full flex items-center justify-center'>
      <Loading />
    </div>
  )
}

export default SignupForm
