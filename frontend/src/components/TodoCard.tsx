import { useDispatch, useSelector } from 'react-redux'
import { TodoInterface } from '../interfaces/interfaces'
import { PiTrash } from 'react-icons/pi'
import { removeTodo, updateTodo } from '../redux/todosSlice'
import { toast } from 'react-toastify'
import { formatDistanceToNow } from 'date-fns'
import { useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'
import { RootState } from '../redux/store'
import Loading from './Loading'
interface TodoCardProps {
  todo: TodoInterface
}

const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
  const { title, description, completed } = todo
  const { token } = useSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch()

  const { mutate: handleCompleted, isLoading: updateLoading } =
    useMutation({
      mutationKey: 'updateTodo',
      mutationFn: async () => {
        const { data } = await axios.patch(
          `http://localhost:8080/api/todos/${todo._id}`,
          {
            completed: !completed,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        return data as TodoInterface
      },
      onSuccess: () => {
        dispatch(
          updateTodo({
            ...todo,
            completed: !completed,
          }),
        )
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message || error.message)
          console.log(error)
        }
      },
    })

  const { mutate: handleDelete, isLoading: deleteLoading } =
    useMutation({
      mutationKey: 'deleteTodo',
      mutationFn: async () => {
        const { data } = await axios.delete(
          `http://localhost:8080/api/todos/${todo._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        return data as TodoInterface
      },
      onSuccess: () => {
        toast.success('Todo deleted successfully ❌')
        dispatch(removeTodo(todo))
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message || error.message)
          console.log(error)
        }
      },
    })

  return !(updateLoading || deleteLoading) ? (
    <div className='card w-96 bg-neutral shadow-xl'>
      <div className='card-body'>
        <div className='flex justify-between'>
          <h2 className='card-title'>{title}</h2>
          <button
            className='btn btn-sm btn-circle btn-outline btn-error'
            onClick={() => handleDelete()}
          >
            <PiTrash />
          </button>
        </div>
        <p>{description}</p>
        <div className='card-actions justify-between items-center'>
          <div className='flex items-center gap-1.5'>
            {formatDistanceToNow(new Date(todo.createdAt), {
              addSuffix: true,
            })}
          </div>
          <label className='cursor-pointer label px-0'>
            <span className='label-text'>Completed</span>
            <input
              type='checkbox'
              className='ml-2 checkbox checkbox-success'
              checked={completed}
              onChange={() => handleCompleted()}
            />
          </label>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <Loading />
    </div>
  )
}

export default TodoCard
