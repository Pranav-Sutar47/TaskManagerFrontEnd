import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { showToast } from './ToastComponent';

export default function Login() {
    const navigate = useNavigate();

    const { register, formState: { errors }, handleSubmit } = useForm();
    //const onSubmit = data => console.log(data);    


    const loginInfo = async(data)=>{
        try{
            let url = String(import.meta.env.VITE_URL);
            url +='/login'
            //console.log(data)
            const response = await fetch(url,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(data),
                mode: 'cors'
            })
            const res = await response.json();
            //console.log(res);
            if(res.success ===true){
                showToast('Login Successful','success');
                localStorage.setItem('token',res.token);
                localStorage.setItem('user',res.name);
                // setTimeout(()=>{
                //     navigate('/home');
                // },1000);
                navigate('/home');
            }else
                showToast(res.msg,'error')
        }catch(err){
            console.log(err);
            showToast('Login Failure','error');
        }
    }

    return (
        <div className='container'>
            <h1 className='text-center'>Login</h1>
            <br />
            <Form onSubmit={handleSubmit(loginInfo)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" {...register('email',{required:true})}
                    aria-invalid={errors.email ? "true" : "false"} />
                </Form.Group>
                    {errors.email?.type === 'required' && <p role="alert">Email is required</p>}

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" {...register('password',{required:true,minLength:4,maxLength:20})}
                    aria-invalid={errors.password ? "true" : "false"}/>
                </Form.Group>
                    {errors.password?.type === 'required' && <p role='alert'>Password is required</p>}
                    
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label onClick={()=>{navigate('/signup')}} className='linkText'> <u>New User ? Register </u></Form.Label>
                </Form.Group>
                <div className='d-flex justify-content-center'>
                <Button variant="success" type="submit">
                    Submit
                </Button>
                </div>
            </Form>
        </div>
    )
}
