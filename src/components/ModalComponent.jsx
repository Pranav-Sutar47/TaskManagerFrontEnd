import React,{useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";

export default function ModalComponent(props) {
 
  useEffect(()=>{
    console.log("Modal",props.data,"Demo")
  },[props.data])



  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: {
      title: props.data?.title || "Default", // Optional chaining to check if props.data exists
      description: props.data?.description || "Default"
    }
  });
  

  // useEffect(() => {
  //   if (props.data) {
  //     reset({
  //       title: props.data.title || '',
  //       description: props.data.description || ''
  //     });
  //   }
  // }, [props.data, reset]);

  const addingTask =(data)=>{

  }
  return (
    <Modal
    show={props.show}
    onHide={props.handleClose}
    backdrop="static"
    keyboard={false}
  >
    <Modal.Header closeButton>
      <Modal.Title>Update Task</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form onSubmit={handleSubmit(addingTask)}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control type="text" placeholder="Enter Title" {...register('title', { required: true, minLength: 5 })}
                        aria-invalid={errors.title ? "true" : "false"} />
                </Form.Group>
                {errors.title?.type === 'required' && <p role='alert'>Title is required</p>}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Description" {...register('description', { required: false })}/>
                </Form.Group>
    </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.handleClose}>
        Close
      </Button>
      <Button variant="success" type='submit'>Understood</Button>
    </Modal.Footer>
  </Modal>
  )
}
