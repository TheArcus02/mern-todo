import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Todos from './pages/Todos';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Todos />} />
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
  );
}
