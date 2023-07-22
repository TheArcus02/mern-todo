import { useDispatch } from 'react-redux'
import { TodoInterface } from '../interfaces/interfaces'
import { PiTrash } from 'react-icons/pi'
import { removeTodo, updateTodo } from '../redux/todosSlice'
import { toast } from 'react-toastify'
import { formatDistanceToNow } from 'date-fns'
interface TodoCardProps {
  todo: TodoInterface
}

const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
  const { title, description, completed } = todo
  const dispatch = useDispatch()

  const handleCompleted = async () => {
    const response = await fetch(
      `http://localhost:8080/api/todos/${todo._id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !completed }),
      },
    )

    const data = await response.json()

    if (response.ok) {
      dispatch(updateTodo({ ...todo, completed: !completed }))
    } else {
      toast.error(data.error)
    }
  }

  const handleDelete = async () => {
    const response = await fetch(
      `http://localhost:8080/api/todos/${todo._id}`,
      {
        method: 'DELETE',
      },
    )

    const data = await response.json()
    if (response.ok) {
      toast.success('❌ Todo deleted successfully')
      dispatch(removeTodo(todo))
    } else {
      toast.error(data.error)
    }
  }

  return (
    <div className='card w-96 bg-neutral shadow-xl'>
      <div className='card-body'>
        <div className='flex justify-between'>
          <h2 className='card-title'>{title}</h2>
          <button
            className='btn btn-sm btn-circle btn-outline btn-error'
            onClick={handleDelete}
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
              onChange={handleCompleted}
            />
          </label>
        </div>
      </div>
    </div>
  )
}

export default TodoCard
