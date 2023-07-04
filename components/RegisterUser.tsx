"use client";
import React, { useState } from 'react'

const RegisterUser = () => {
    const [token, setToken] = useState('');
  const handleGenerateToken = async () => {
    const payload = {
      name: "ali",
      email: 'bhaiwork22@gmail.com',
      password:'444',
    };
  
  const response = await fetch('/api/client-register/', {
      
        method:"POST",
        mode:'no-cors',
        cache:'no-store',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
  });

  if (response.ok) {
    const data = await response.json();
    console.log("data"+data);
    console.log(data.message);
    setToken(data.authToken);
  }

  }
  return (
    <div>
    <button onClick={handleGenerateToken}>Generate JWT</button>
    {token && <p>{token}</p>}
    </div>
  )
}

export default RegisterUser;