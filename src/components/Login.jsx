import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {login as authLogin} from  '../store/authSlice'
import {Button,Logo,Input} from './index'
import authService from '../appwrite/auth'
import {useForm} from 'react-hook-form'
import { useDispatch } from 'react-redux'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {register,handleSubmit} = useForm();
  const [error,setError] = useState('')

  const handleLogin = async(data)=>{
    setError('')
    try {
      const session =  await authService.login(data)
     if(session){
      const userData = await authService.getCurrentUser()
      if(userData) dispatch(authLogin(userData));
      navigate('/')
      
     }
    } catch (error) {
      setError(error)
    }
  }

  return (
    <div className='flex items-center justify-center w-full'>

     <div className=''>
           <span>
            <Logo width='100px'/>
           </span>
     </div>
      <h2> Sign in to your account</h2>
      <p>
        Don&apos;t have any account?&mbsp;
        <Link to={'/signup'}>
          Signup
        </Link>
      </p>
      {error && <p>
        {error}
      </p>}

      <form onSubmit={handleSubmit(handleLogin)}>
       <div>
        <Input
          label="Email"
          placeholder='Enter your mail'
          type='Email'
          {...register(
            "email",
            {
              required:true,
              validate:{
                matchPattern:(value)=>/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.
                test(value) || "Email address must be a valid address"
              }
            }
          )}
        />
        <Input
          label='Password'
          type= 'password'
          placeholder='Enter Password'
          {...register('password',{
            required:true,
          })}
        />
        <Button type='submit' className='w-full'>
            Sign in
        </Button>
       </div>
      </form>
    </div>
  )
}

export default Login
