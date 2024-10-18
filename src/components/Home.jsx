import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import { useNavigate } from 'react-router-dom';
import TaskComponents from './TaskComponents';

export default function Home() {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate('/login');
  }
  const [name, setName] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setName(localStorage.getItem('user'));
    setToken(localStorage.getItem('token'));
  }, [])

  return (
    <div className='container'>
      {
        token != null ? (
          <div className='container mt-2'>
            <div className='d-flex'>
              <h1>{`Hello ${name}`}</h1>
              <Button variant='secondary' size='sm' className='ms-auto' onClick={logOut}>Log Out</Button>
            </div>
            <div className='container-fluid mt-2'>
              <TaskComponents />
            </div>

          </div>
        ) : (
          <div className='container'>
            <div className='d-flex mt-4'>
              <h1>Please Login</h1>
              <Button variant='success' size='sm' className='ms-auto' onClick={() => { navigate('/login') }}>Login</Button>
            </div>
            <div className='text-bg-dark rounded-3 p-5 mt-5 text-center'>
              <h1>Login Required</h1>
            </div>
          </div>
        )
      }

    </div>
  )
}
