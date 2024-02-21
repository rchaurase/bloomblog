import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link,useNavigate } from 'react-router-dom'
import {Button,Input,Logo} from './index'
import { useDispatch } from 'react-redux'
import {useForm} from 'react-hook-form'


function Signup() {
  const [error,setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {register,handleSubmit} = useForm()
  
  const SignupForm = async(data)=>{
    setError('')
    try {
     const userData =  await authService.createAccount(data)
     if(userData){
      const userData = await authService.getCurrentUser()
      if(userData){
        dispatch(login(userData))
      } 
    }
    } catch (error) {
      console.log(`you are not register:${error}`)
    }
  }

  return (
    <div>
      <div>
        <div>
           <Logo/>
        </div>
        <h2> Sign up to your account</h2>
      <p>
        already  have an account?&mbsp;
        <Link to={'/login'}>
          Login
        </Link>
      </p>
      {error && <p>
        {error}
      </p>}
        <form onSubmit={handleSubmit(SignupForm)}>
           <div>
            <Input
              label = "Full Name"
              type='text'
              placeholder="Enter your name"
              {...register('name',{
                required:true
              })}
            />
            <Input
              label = "Email"
              type= 'email'
              placeholder="Enter your Email"
              {...register('email',
              {
                required:true,
                validate:{
                matchPattern:(value)=>/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.
                test(value) || "Email address must be a valid address"}
              }
              )}
            />
            <Input
              label="Password"
              type="password"
              placeholder='Enter your Password'
              {...register('password',{
                required:true
              })}
            />
            <Button
             type='submit'
             className='w-full'
            >
              Create Account
            </Button>
           </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
