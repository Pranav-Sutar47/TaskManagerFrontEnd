import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import TaskFetch from './context/TaskFetch'

function App() {

  return (
    <div className='container-fluid'>
    <TaskFetch>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login'/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
    </TaskFetch>
    </div>
  )
}

export default App
