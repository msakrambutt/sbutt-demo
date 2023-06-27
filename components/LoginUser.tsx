"use client";
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';


const LoginUser = () => {
    const [token, setToken] = useState('');
  const handleGenerateToken = async () => {
    const payload = {
      clientEmail: 'msakram@gmail.com',
      clientPwd:'55',
     
    };
  
  const response = await fetch('/api/client-login/', {
      
    method: "POST",
        mode:'no-cors',
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
    <button onClick={handleGenerateToken}>Generate JWT</button>
    {token && <p>{token}</p>}
    </div>
  )
}

export default LoginUser