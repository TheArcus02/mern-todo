import { useState } from 'react'
import TodoList from '../components/TodoList'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { setTodos } from '../redux/todosSlice'
import Loading from '../components/Loading'
import AddForm from '../components/AddForm'
import { useQuery } from 'react-query'
import axios, { AxiosError } from 'axios'
import { TodoInterface } from '../interfaces/interfaces'
import { toast } from 'react-toastify'

const Todos = () => {
  const todos = useSelector((state: RootState) => state.todos.todos)
  const user = useSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)

  const { isLoading } = useQuery({
    queryKey: 'todos',
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL || ''}/api/todos`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      )
      return data as TodoInterface[]
    },
    onSuccess: (data) => {
      dispatch(setTodos(data))
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || error.message)
        console.log(error)
      }
    },
  })

  const handleAddTodo = () => {
    setIsOpen((prev) => !prev)
  }

  return !isLoading && todos ? (
    <div className='flex flex-col justify-center items-center w-full h-full p-10 '>
      {todos.length > 0 ? (
        <>
          <div className='text-3xl text-primary mb-10'>Todo List</div>

          <TodoList todos={todos} />
        </>
      ) : (
        <div className='alert max-w-md alert-info'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='stroke-current shrink-0 w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            ></path>
          </svg>
          No todos yet. Add one to get started!
        </div>
      )}

      <div className='w-full flex justify-center mt-10'>
        {!isOpen ? (
          <button
            className='btn btn-wide btn-primary'
            onClick={handleAddTodo}
          >
            Add Todo
          </button>
        ) : (
          <AddForm handleClose={handleAddTodo} />
        )}
      </div>
    </div>
  ) : (
    <div className='min-h-screen min-w-full flex items-center justify-center'>
      <Loading />
    </div>
  )
}

export default Todos
