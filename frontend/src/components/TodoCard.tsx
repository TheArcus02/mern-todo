import { useDispatch, useSelector } from 'react-redux'
import { TodoInterface } from '../interfaces/interfaces'
import { PiTrash } from 'react-icons/pi'
import { removeTodo, updateTodo } from '../redux/todosSlice'
import { toast } from 'react-toastify'
import { formatDistanceToNow } from 'date-fns'
import { useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'
import { RootState } from '../redux/store'
interface TodoCardProps {
  todo: TodoInterface
}

const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
  const { title, description, completed } = todo
  const user = useSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch()

  const { mutate: handleCompleted, isLoading: updateLoading } =
    useMutation({
      mutationKey: 'updateTodo',
      mutationFn: async () => {
        const { data } = await axios.patch(
          `${import.meta.env.VITE_API_URL || ''}/api/todos/${
            todo._id
          }`,
          {
            completed: !completed,
          },
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
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
          `${import.meta.env.VITE_API_URL || ''}/api/todos/${
            todo._id
          }`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
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

  return (
    <div className='card w-72 sm:w-96 bg-neutral shadow-xl'>
      <div className='card-body'>
        <div className='flex justify-between'>
          <h2 className='card-title'>{title}</h2>
          <button
            className='btn btn-sm btn-circle btn-outline btn-error'
            onClick={() => handleDelete()}
            disabled={updateLoading || deleteLoading}
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
              disabled={updateLoading || deleteLoading}
            />
          </label>
        </div>
      </div>
    </div>
  )
}

export default TodoCard
