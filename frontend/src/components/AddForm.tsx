/* eslint-disable @typescript-eslint/no-unused-vars */
import { TodoInterface } from '../interfaces/interfaces'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo } from '../redux/todosSlice'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useEffect } from 'react'
import Loading from './Loading'
import { RootState } from '../redux/store'

interface AddFormProps {
  handleClose: () => void
}

const TodoValidator = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(20, { message: 'Title must be less than 20 characters' }),
  description: z
    .string()
    .min(1, { message: 'Description is required' }),
})

type TodoValidatorType = z.infer<typeof TodoValidator>

const AddForm: React.FC<AddFormProps> = ({ handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoValidatorType>({
    resolver: zodResolver(TodoValidator),
  })

  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)

  const { mutate: addTodoHandler, isLoading } = useMutation({
    mutationFn: async ({ title, description }: TodoValidatorType) => {
      const { data } = await axios.post(
        'http://localhost:8080/api/todos',
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      )
      return data as TodoInterface
    },
    onSuccess: (data) => {
      dispatch(addTodo({ ...data }))
      toast.success('Todo added successfully 🎉')
      handleClose()
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
      toast.error(
        errors.title?.message || errors.description?.message,
      )
    }
  }, [errors])

  return !isLoading ? (
    <form
      onSubmit={handleSubmit((data) => addTodoHandler(data))}
      className='flex flex-col gap-3 w-full max-w-md p-2 rounded-lg'
    >
      <input
        type='text'
        className='input input-bordered'
        placeholder='Title'
        autoFocus
        {...register('title')}
      />
      <textarea
        className='textarea textarea-bordered'
        placeholder='Description'
        {...register('description')}
      ></textarea>
      <div className='flex justify-between'>
        <button className='btn btn-warning' onClick={handleClose}>
          Cancel
        </button>
        <button className='btn btn-primary' type='submit'>
          Add
        </button>
      </div>
    </form>
  ) : (
    <div className='min-w-full flex items-center justify-center'>
      <Loading />
    </div>
  )
}

export default AddForm
