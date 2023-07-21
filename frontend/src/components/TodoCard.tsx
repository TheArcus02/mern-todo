import { TodoInterface } from '../interfaces/interfaces';
import { PiTrash } from 'react-icons/pi';
interface TodoCardProps {
  todo: TodoInterface;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
  const { title, description, completed } = todo;
  return (
    <div className='card w-96 bg-neutral shadow-xl'>
      <div className='card-body'>
        <div className='flex justify-between'>
          <h2 className='card-title'>{title}</h2>
          <button className='btn btn-sm btn-circle btn-outline btn-error'>
            <PiTrash />
          </button>
        </div>
        <p>{description}</p>
        <div className='card-actions justify-between items-center'>
          <label className='cursor-pointer label px-0'>
            <input
              type='checkbox'
              className='mr-2 checkbox checkbox-success'
              checked={completed}
            />
            <span className='label-text'>Completed</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
