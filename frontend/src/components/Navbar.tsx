import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../redux/authSlice'
import { RootState } from '../redux/store'
import { toast } from 'react-toastify'
import { setTodos } from '../redux/todosSlice'

const Navbar = () => {
  const dispatch = useDispatch()

  const user = useSelector((state: RootState) => state.auth.user)

  const handleLogout = () => {
    localStorage.removeItem('user')
    dispatch(logout())
    dispatch(setTodos([]))
    toast.success('Logout successful 🔒')
  }

  return (
    <div className='navbar bg-neutral'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <label tabIndex={0} className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
          >
            <li>
              <Link to='/todos'>Todos</Link>
            </li>
          </ul>
        </div>
        <Link
          to='/todos'
          className='btn btn-ghost normal-case text-xl'
        >
          MERN TODO
        </Link>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <Link to='/todos'>Todos</Link>
          </li>
        </ul>
      </div>
      <div className='navbar-end'>
        {user?.token ? (
          <>
            <div>{user.email}</div>
            <button
              className='btn btn-ghost ml-2'
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to='/login' className='btn'>
            Login
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
