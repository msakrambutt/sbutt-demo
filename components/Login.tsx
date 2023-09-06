"use client";
import toast, { Toaster } from 'react-hot-toast';


const Login = () => {
  const handleGenerateToken = async () => {
    const payload = {
      email: "suleman11@gmail.com",
      password:"555"
     
    };
  
  const response = await fetch('/api/login/', {
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
  }else{
    toast.error("user login error"), {
      position: 'top-center',
    };
  }

  }
  return (
    <div>
    <Toaster  position="top-center"/>
    <button className="bg-gray-700 text-white w-full py-5" onClick={handleGenerateToken}>Login User</button>
    </div>
  )
}

export default Login