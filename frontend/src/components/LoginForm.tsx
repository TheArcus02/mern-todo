import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { UserInterface } from '../interfaces/interfaces'
import { useDispatch } from 'react-redux'
import { login } from '../redux/authSlice'
import Loading from './Loading'

const LoginValidator = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6, { message: 'Password is too short' }),
})

type LoginValidatorType = z.infer<typeof LoginValidator>

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValidatorType>({
    resolver: zodResolver(LoginValidator),
  })

  const { mutate: loginHandler, isLoading } = useMutation({
    mutationFn: async ({ email, password }: LoginValidatorType) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL || ''}/api/user/login`,
        { email, password },
      )
      return data as UserInterface
    },
    onSuccess: (data) => {
      localStorage.setItem('user', JSON.stringify(data))
      dispatch(login(data))
      toast.success('Login successful 🎉')
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
    <form onSubmit={handleSubmit((data) => loginHandler(data))}>
      <h1 className='text-3xl font-bold mb-5 text-center '>Login</h1>
      <div className='flex flex-col sm:w-96 '>
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
        <button className='btn btn-secondary mt-5' type='submit'>
          Login
        </button>
        <div className='mt-5'>
          <Link to='/signup' className='text-info hover:underline'>
            Don't have an account? Sign up
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

export default LoginForm
