import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import CountryCode from '../../data/countrycode.json'
const ContactUsForm = () => {
  const [loading,setloading]=useState(false);
  
    const {
      register,
      handleSubmit,
      reset,
     formState:{errors,isSubmitSuccessful}
    }= useForm();

    useEffect(()=>
    {
      if(isSubmitSuccessful)
      {
        reset({
          email:"",
          firstname:"",
           lastname:"",
           message:"",
           phoneNo:"",

        })
      }
    }
    ,[reset,isSubmitSuccessful]
    )
    const submitContactForm=async(data)=>
    {
   console.log(data);
   try{
    setloading(true);
    const response={status:'ok'}
    console.log("Logging response",response);
    alert('Your Message has been sent successfully');
    setloading(false);
   }
   catch(err)
   {
    console.log("Error",err.message);
     setloading(false);
   }
    }
  
  return (
    <>
    <form onSubmit={handleSubmit(submitContactForm)}>
      <div className='flex flex-col gap-10'>
      <div className='flex flex-row gap-5'>
        <div>
   <label htmlFor='firstname'>
    First Name
   </label>
   <input type='text' name='firstName' id='firstName' placeholder='Enter Your first name' className='text-gray-900'
   {...register("firstname",{required:true})}
   />
   {
    errors.firstname &&(
      <sapn>
        Please enter your First Name
      </sapn>
    )
   }
      </div>
      <div className=''>
   <label htmlFor='lastname'>
    Last Name
   </label>
   <input type='text' name='lastName' id='lastName' placeholder='Enter Your last name' className='text-gray-900'
   {...register("lastname")}
   />
   
      </div>
      </div>

      <div className='flex flex-col' >
   <label htmlFor='email'>
    Email:
   </label>
   <input type='email' name='email' id='email' placeholder='Enter Your Email' className='text-gray-900'
   {...register("email",{required:true})}
   />
   {
    errors.email &&(
      <sapn>
        Please enter your email
      </sapn>
    )
   }
      </div>
  <div className='flex flex-col gap-2'>
    <label htmlFor='phonenumber'>Phone Number</label>
    <div className='flex flex-row gap-1'>
      <div className='flex w-[35%]'>
    <select
    name='code'
    className='text-gray-800 w-[70%]'
    id='code'
    {...register("countrycode",{required:true})}>
{
  CountryCode.map((ele,index) => {
 
    return (
      <option className='text-gray-900' key={index} value={ele.code}>{ele.code}-{ele.country}</option>
    )
  })
}
</select>
</div>
<div className='w-[60%]'>
  <input type="tel" name='phone' id='phone' placeholder='10 Digits' className='w-full text-gray-900'  {...register("phoneNo",{required:true})}/>
</div>
</div>
  </div>
      <div className='flex flex-col'>
        <lable htmlFor='message'>Message</lable>
        <textarea rows="10" cols="30" name='message' id='message' placeholder='Type Your Message Here ... ' className='text-gray-900' {...register("message",{required:true})}/>

        {
        errors.message && (
          <span>
            Please Enter your Message
          </span>
        )
      }
      </div>
      <div className='items-center'>
       <button type='submit' className='px-6 rounded-md  bg-yellow-300 text-center text-[16px] text-gray-900'>
        Send Message
        </button> 
      </div>
      </div>
    </form>
    </>
  )
}

export default ContactUsForm
