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
        'http://localhost:8080/api/todos',
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
      <div className='text-3xl text-primary mb-10'>Todo List</div>

      <TodoList todos={todos} />
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
