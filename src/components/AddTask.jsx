import React,{ useContext, useState } from 'react'
import { useForm } from "react-hook-form";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import TaskContext from '../context/TaskContext';

export default function AddTask() {

    const { register, formState: { errors }, handleSubmit ,reset} = useForm();
    const context = useContext(TaskContext);

    const {addTask} = context;

    const addingTask = (data)=>{
        //console.log(data);
        addTask(data.title,data.description);
        reset();
    }

  return (
    <div>
        <Form onSubmit={handleSubmit(addingTask)}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control type="text" placeholder="Enter Title" {...register('title', { required: true, minLength: 5 })}
                        aria-invalid={errors.title ? "true" : "false"} />
                </Form.Group>
                {errors.title?.type === 'required' && <p role='alert'>Title is required</p>}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Description" {...register('description', { required: false })}/>
                </Form.Group>

                <div className='d-flex justify-content-center'>
                    <Button variant="success" type="submit">
                        Add Task
                    </Button>
                </div>
            </Form>
    </div>
  )
}
