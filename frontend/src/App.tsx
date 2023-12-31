import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Todos from './pages/Todos'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import RequireAuth from './components/RequireAuth'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to='/todos' />} />
        <Route element={<RequireAuth />}>
          <Route path='/todos' element={<Todos />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
      <ToastContainer
        position='bottom-left'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </>
  )
}
