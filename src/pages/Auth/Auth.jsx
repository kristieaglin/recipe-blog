import React, { useState } from 'react'
import './Auth.css'
import { auth } from '../../config/firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Auth() {

    const navigate = useNavigate()

    const [existingUser, setExistingUser] = useState(true)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignup = e =>{
        e.preventDefault()

        createUserWithEmailAndPassword(auth, email, password)
        .then(res=>{
            // console.log(res)
            //add username as display name
            updateProfile(auth.currentUser, {displayName: name})
            navigate('/')
        })
        .catch(err=>console.log(err))
    }

    const handleLogin = e =>{
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then(res=>navigate('/'))
        .catch(err=>console.log(err))
    }


  return (
    <div className='form-container'>
        {
            existingUser ?
            <form onSubmit={handleLogin} className='auth-form'>
                <h2>Welcome back!</h2>
                <div className='auth-input-container'>
                    <input
                        type='email'
                        placeholder='Enter your email'
                        required
                        onChange={(e)=>setEmail(e.target.value)} 
                        value={email} 
                        className='auth-input'
                    />
                    <input
                        type='password'
                        placeholder='Enter your password'
                        required
                        onChange={(e)=>setPassword(e.target.value)} 
                        value={password} 
                        className='auth-input'
                        minLength='6'
                    />
                </div>
                <button type='submit' className='auth-button'>Log in</button>
                <p>Don't have an account? Sign up <span onClick={()=>setExistingUser(false)} className='signup-link'>here</span>.</p>
            </form>
            :
            <form onSubmit={handleSignup} className='auth-form'>
                <h2>Create a new account.</h2>
                <div className='auth-input-container'>
                    <input 
                        type='text' 
                        placeholder='Enter your name' 
                        required 
                        onChange={(e)=>setName(e.target.value)} 
                        value={name} 
                        className='auth-input'
                    />
                    <input
                        type='email'
                        placeholder='Enter your email'
                        required
                        onChange={(e)=>setEmail(e.target.value)} 
                        value={email} 
                        className='auth-input'
                    />
                    <input
                        type='password'
                        placeholder='Enter your password'
                        required
                        onChange={(e)=>setPassword(e.target.value)} 
                        value={password} 
                        className='auth-input'
                        minLength='6'
                    />
                </div>
                <button type='submit' className='auth-button'>Sign up</button>
                <p>Have an account? Log in <span onClick={()=>setExistingUser(true)} className='signup-link'>here</span>.</p>
            </form>
        }
        <img className='auth-img' src='https://images.unsplash.com/photo-1592837613828-4b65deb44f15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fGNvb2tpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60' />
    </div>
  )
}

export default Auth