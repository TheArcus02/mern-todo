import { useState } from 'react'
import { TodoInterface } from '../interfaces/interfaces'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { addTodo } from '../redux/todosSlice'

interface AddFormProps {
  handleClose: () => void
}

const AddForm: React.FC<AddFormProps> = ({ handleClose }) => {
  const [todoData, setTodoData] = useState<Partial<TodoInterface>>({
    title: '',
    description: '',
    completed: false,
  })

  const dispatch = useDispatch()

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setTodoData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleAddTodo = async () => {
    if (!todoData.title || !todoData.description) {
      toast.error('📝 Please fill all the fields')
      return
    }

    const response = await fetch('http://localhost:8080/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    })

    const data = await response.json()

    if (response.ok) {
      dispatch(addTodo({ ...data }))
      toast.success('✔ Todo added successfully')
    } else {
      console.log(data)
      toast.error(data.error)
    }

    handleClose()
  }

  return (
    <div className='flex flex-col gap-3 w-full max-w-md p-2 rounded-lg'>
      <input
        type='text'
        className='input input-bordered'
        name='title'
        placeholder='Title'
        onChange={(e) => handleOnChange(e)}
      />
      <textarea
        className='textarea textarea-bordered'
        name='description'
        placeholder='Description'
        onChange={(e) => handleOnChange(e)}
      ></textarea>
      <div className='flex justify-between'>
        <button className='btn btn-warning' onClick={handleClose}>
          Cancel
        </button>
        <button className='btn btn-primary' onClick={handleAddTodo}>
          Add
        </button>
      </div>
    </div>
  )
}

export default AddForm
