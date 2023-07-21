import TodoList from '../components/TodoList';

const todos = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full p-10 '>
      <div className='text-3xl text-primary mb-10'>Todo List</div>
      <TodoList />
    </div>
  );
};

export default todos;
