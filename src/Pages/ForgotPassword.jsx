import React, { useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI'
const ForgotPassword = () => {
    const [emailSent,setEmailSent]=useState(false);
    const [email,setEmail]=useState("");
    const {loading}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const handleSubmit=(e)=>
    {
            e.preventDefault();
            dispatch(getPasswordResetToken(email, setEmailSent))
    }
  return (
    <div>
      {loading?(
      <div>Loading</div>):
      (
      <div className='text-white flex justify-center items-center'>
       
            <h1>
                {
                 !emailSent ? "Reset Your Password":"Check your Email"   
                }
            </h1>
            <p>
                {
                   !emailSent ? " lorem":"lorenm2"
                }
            </p>

           <form onSubmit={handleSubmit}>
            {
            !emailSent && (
                <label>
                    <p>
                        Email Address
                    </p>
                    <input  className='text-gray-900'
                    required
                    type='email'
                    name='email'
                    value={email}
                    onChange={e=> setEmail(e.target.value)}
                    placeholder='Enter your Email'
                    />
                </label>
            )}
            <button type='submit'>
                {!emailSent? "Send Reset Link": "Reset Password"}
            </button>

           </form>
           <div>
            <Link to='/login'>
                Back to login
            </Link>
            </div>
      </div>
      )
      }
    </div>
  )
}

export default ForgotPassword
