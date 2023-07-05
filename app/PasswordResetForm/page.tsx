"use client";
import React, { useState } from 'react';

const PasswordResetForm = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState('');
  const formHandler=async(e:any)=>{
    e.preventDefault();
    if (!email) {
      setMessage('Email field is empty.');
      return;
    }
    handleSubmit();
  }
  const handleSubmit = async () => {
    
    try {
      // Call the password reset API
      const response = await fetch('/api/password-reset/', {
            method: "POST",
            cache: 'no-store',
            headers: {
              Accept:'application/json',
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({email})
      })
     
      console.log(response.status);
      // console.log(data);
      if (response.ok) {
        // const data =await response.json();
        console.log(response.ok)
        // console.log("response from server",data);
        setMessage(response.ok+" , Email has been send to your mail id, follow the instructions");
        // console.log(data);
        setEmail('');

      }else{
        console.log(response.ok)
        const errorData =await response.json();
        console.log("Error response from server",errorData)
        setMessage("Unexpted end of JSON Error");
        setEmail('');
      }
      
    } catch (error) {
      setMessage('Error requesting password reset'+ error);
      console.log(error);
    }
  };

  return (
    <>
    <section className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
      <div className="lg:w-full md:w-1/2 md:pr-16 lg:pr-0 pr-0">
        <h1 className="title-font font-medium text-3xl text-gray-900">PanaCloud LMS Reset Password!</h1>
      </div>
      <div className="lg:w-full md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Forgot/Reset Password</h2>
        <form onSubmit={(e)=>formHandler(e)}>
        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
          <input type="email" id="email" name="email" value={email} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <button  className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" type="submit">Reset Password</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  </section>
  </>
  );
};

export default PasswordResetForm;
