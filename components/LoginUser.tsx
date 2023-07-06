"use client";
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';


const LoginUser = () => {
    const [token, setToken] = useState('');
  const handleGenerateToken = async () => {
    const payload = {
      name:"shahid1",
      email: 'msakrambutt1@gmail.com',
      password:'555',
     
    };
  
  const response = await fetch('/api/register/', {
    method: "POST",
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
  });

  if (response.ok) {
    const data = await response.json();
    console.log("data"+data);
    toast.success(response.status+" User Login"), {
      position: 'top-center',
    };
    console.log(response.status);
    setToken(data.authToken);
  }else{
    toast.error("user login error"), {
      position: 'top-center',
    };
  }

  }
  return (
    <div>
    <Toaster  position="top-center"/>
    <button className="bg-gray-700 text-white w-full py-5" onClick={handleGenerateToken}>Create New User</button>
    {token && <p>{token}</p>}
    </div>
  )
}

export default LoginUser