import React, { useContext, useEffect, useState } from 'react'
import TaskItem from './TaskItem'
import TaskContext from '../context/TaskContext';
import AddTask from './AddTask';
import ModalComponent from './ModalComponent';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";


export default function TaskComponents() {

  const context = useContext(TaskContext);
  const { tasks, getTask ,updateTask} = context;

  useEffect(() => {
    getTask();
  }, [])

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState({title:"default",description:"default"});

  const addingTask =(val)=>{
    val._id = data._id;
    updateTask(val);
    //console.log(val)
    setShow(false);
  }

  const childProps = (data) => {
    setData(data);
    //console.log("Props",data)
  }


  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: {
      title: data.title,// Optional chaining to check if props.data exists
      description: data.description
    }
  });

  useEffect(() => {
    reset({
      title: data.title,
      description: data.description
    });
  }, [data, reset]);

  return (
    <div className='row mt-2'>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(addingTask)}>
        <Modal.Body>
        
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control type="text" placeholder="Enter Title" {...register('title', { required: true, minLength: 5 })}
                aria-invalid={errors.title ? "true" : "false"} />
            </Form.Group>
            {errors.title?.type === 'required' && <p role='alert'>Title is required</p>}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Description" {...register('description', { required: false })} />
            </Form.Group>
    
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" type='submit'>Update</Button>
        </Modal.Footer>
        </Form>
      </Modal>
      <AddTask />
      {
        tasks.length >= 1 ? (
          tasks.map((task) => {
            return (
              <TaskItem key={task._id} task={task} handleClose={handleClose} handleShow={handleShow} show={show} onSendData={childProps} />
            )
          })
        ) : (
          <h1 className='text-center mt-2'>No Tasks To Perform</h1>
        )
      }
    </div>
  )
}
