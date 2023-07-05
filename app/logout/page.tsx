'use server'
import React from 'react';
import Link from 'next/link';
import User_Token from '../getTokenFromCookie/cookies';


const Logout = async() => {
    try {
        const userCookie = await User_Token();
         console.log(`user_Cookie${userCookie}`);
        //  if(userCookie){
        //   cookies().set({
        //     name: 'authToken',
        //     value: '',
        //     maxAge:-1,
        //     expires:new Date('2022-10-05'),
        //     path: '/', // For all paths
        //   })
        //  }
        const response = await fetch(`${process.env.BASE_URL}/api/logout?user_Cookie=${userCookie}`, {
          method: "GET",
          cache:'no-store',
          headers:{
            'Content-Type':'application/json'
          }
        });
        if(response.ok){
        const query = await response.json();
        console.log(response.status+" "+query);
        }
    }catch (error) {
        console.log(error);
    }

  return (
    <div>
    <h2 className='font-bold text-red-500'>Cookies has been deleted!</h2>
    <Link href={"/"}>Go to Home Page</Link>
    </div>
  )
}

export default Logout;