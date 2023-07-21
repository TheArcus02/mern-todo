import { useEffect, useState } from 'react';
import { TodoInterface } from '../interfaces/interfaces';
import Loading from './Loading';

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
    <div>
      {todos.map((todo: TodoInterface) => (
        <div key={todo.title}>{todo.title}</div>
      ))}
    </div>
  ) : (
    <Loading />
  );
};

export default TodoList;
