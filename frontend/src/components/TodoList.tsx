import { useEffect, useState } from 'react';
import { TodoInterface } from '../interfaces/interfaces';
import Loading from './Loading';
import TodoCard from './TodoCard';

const TodoList = () => {
  const [todos, setTodos] = useState<TodoInterface[] | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch('http://localhost:8080/api/todos');
      if (response.ok) {
        const todos = await response.json();
        setTodos(todos);
      }
    };
    fetchTodos();
  }, []);

  return todos ? (
    <div className='flex flex-col p-2 gap-3'>
      {todos.map((todo: TodoInterface) => (
        <TodoCard todo={todo} key={todo._id} />
      ))}
    </div>
  ) : (
    <Loading />
  );
};

export default TodoList;
