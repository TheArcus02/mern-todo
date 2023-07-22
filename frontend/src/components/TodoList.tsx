import { TodoInterface } from '../interfaces/interfaces'

import TodoCard from './TodoCard'

interface TodoListProps {
  todos: TodoInterface[]
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <div className='flex flex-col p-2 gap-3'>
      {todos.map((todo: TodoInterface) => (
        <TodoCard todo={todo} key={todo._id} />
      ))}
    </div>
  )
}

export default TodoList
