import React from 'react';
import Link from 'next/link';
import User_Token from '../getTokenFromCookie/cookies';


const Logout = async() => {
  
    try {
        const userCookie = await User_Token();

         console.log(`user_Cookie${userCookie}`);
        const response = await fetch(`${process.env.BASE_URL}/api/logout`, {
          method: "POST",
          cache:'no-store',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({userCookie})
        });
        if(response.ok){
        const query = await response.json();
        console.log(response.status+" "+query);
        }else{
          console.log("else "+response.status);
        }
    
    }catch (error) {
        console.log("catch error"+error);
   
    }
  
  return (
    <div>
    <h2 className='font-bold text-red-500'>Cookies has been deleted!</h2>
    <Link href={"/"}>Go to Home Page</Link>
    </div>
  )
}

export default Logout;