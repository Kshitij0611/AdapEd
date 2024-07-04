import React, { useState } from 'react'
import axios from 'axios'

import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
function Login() {
    const navigate = useNavigate()
    const [data,setData] = useState({email:"",password:""})
    const handleLogin = ()=>{
        const loading=toast.loading('Logging in...')
        axios.post('http://localhost:8080/api/users/auth',data,{withCredentials:true,headers:{
            "Access-Control-Allow-Origin":"false"
        }}).then(res=>{
            console.log(res)
            if(res.data.message!=='Invalid email or password'){
                localStorage.setItem('userID',res.data._id)
                localStorage.setItem('jwt',res.data.jwt)
                localStorage.setItem('username',res.data.username)
                // dispatch(add({name:res.data.name,email:res.data.email,gender:res.data.gender,userId:res.data._id}))
                toast.dismiss(loading)
                navigate('/')
                toast.success('Logged in successfully')
            }else{
                toast.dismiss(loading)
                toast.error('Invalid email or password')
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

  return (
    <div>
      <div className='w-screen h-screen flex justify-center items-center text-left'>
        {/* <Loader/> */}
        <Toaster/>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={(e)=>setData({...data,email:e.target.value})}/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e)=>{setData({...data,password:e.target.value})}} required=""/>
                  </div>
                  <div className="flex items-center justify-between">
                      <a href="/" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button type="button" className="w-full text-white bg-gray-700 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleLogin}>Sign in</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <a href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                  </p>
              </form>
          </div>
    </div>
    </div>
    </div>
  )
}

export default Login
