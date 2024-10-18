import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { showToast } from './ToastComponent';


export default function Signup() {
    const navigate = useNavigate();

    const { register, formState: { errors }, handleSubmit } = useForm();

    const signupInfo = async (data) => {
        try {
            let url = String(import.meta.env.VITE_URL)
            url += '/signup'
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const res = await response.json();

            if (res.success === true) {
                showToast('Account Created Sucessfully', 'success');
                navigate('/login');
            } else {
                showToast(res.msg, 'error');
            }
        } catch (err) {
            console.log(err)
        }

    }


    return (
        <div className='container-fluid'>
            <h1 className='text-center'>SignUp</h1>
            <br />

            <Form onSubmit={handleSubmit(signupInfo)}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Enter Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" {...register('name', { required: true, minLength: 6 })}
                        aria-invalid={errors.name ? "true" : "false"} />
                </Form.Group>
                {errors.name?.type === 'required' && <p role='alert'>Name is required</p>}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" {...register('email', { required: true })}
                        aria-invalid={errors.email ? "true" : "false"} />
                </Form.Group>
                {errors.email?.type === 'required' && <p role="alert">Email is required</p>}

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" {...register('password', { required: true, minLength: 4, maxLength: 20 })}
                        aria-invalid={errors.password ? "true" : "false"} />
                </Form.Group>
                {errors.password?.type === 'required' && <p role='alert'>Password is required</p>}

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label onClick={() => { navigate('/login') }} className='linkText'> <u>Already User ? Login </u></Form.Label>
                </Form.Group>
                <div className='d-flex justify-content-center'>
                    <Button variant="success" type="submit">
                        Sign Up
                    </Button>
                </div>
            </Form>

        </div>
    )
}
