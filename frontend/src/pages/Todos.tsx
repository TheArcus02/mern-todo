import { useEffect, useState } from 'react'
import TodoList from '../components/TodoList'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { setTodos } from '../redux/todosSlice'
import Loading from '../components/Loading'
import AddForm from '../components/AddForm'

const Todos = () => {
  const todos = useSelector((state: RootState) => state.todos.todos)
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)

  // TODO: remake to useQuery
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch('http://localhost:8080/api/todos')
      if (response.ok) {
        const data = await response.json()
        dispatch(setTodos(data))
      }
    }

    todos.length === 0 && fetchTodos()
  }, [dispatch, todos])

  const handleAddTodo = () => {
    setIsOpen((prev) => !prev)
  }

  return todos.length > 0 ? (
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
