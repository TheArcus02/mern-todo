import { useEffect } from 'react';
import TodoList from '../components/TodoList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setTodos } from '../redux/todosSlice';
import Loading from '../components/Loading';

const Todos = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch('http://localhost:8080/api/todos');
      if (response.ok) {
        const data = await response.json();
        dispatch(setTodos(data));
      }
    };

    todos.length === 0 && fetchTodos();
  }, [dispatch, todos]);

  return todos.length > 0 ? (
    <div className='flex flex-col justify-center items-center w-full h-full p-10 '>
      <div className='text-3xl text-primary mb-10'>Todo List</div>
      <TodoList todos={todos} />
    </div>
  ) : (
    <Loading />
  );
};

export default Todos;
