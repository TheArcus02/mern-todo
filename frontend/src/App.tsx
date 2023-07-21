import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Todos from './pages/Todos';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Todos />} />
      </Routes>
    </>
  );
}
