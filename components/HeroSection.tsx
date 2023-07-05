import Image from 'next/image'
import React from 'react'
import logo from "../../dine-hackathon/pics/logo.jpeg";
import Link from 'next/link';
import LoginUser from './LoginUser';
import PasswordResetForm from '../app/PasswordResetForm/page';
import User_Token from '../app/getTokenFromCookie/cookies';
import { JWTPayload, jwtVerify } from 'jose';

let JWT_SECRET_KEY: string;
if (typeof process.env.SECRET_KEY === "string") {
  JWT_SECRET_KEY = process.env.SECRET_KEY;
}

const HeroSection = async() => {
  const userToken = await User_Token();
  
  let userName:string="";
  if(userToken){
    try{
      const verified = await jwtVerify(
        userToken,
        new TextEncoder().encode(JWT_SECRET_KEY)
      );
      console.log("token verify",verified);
      if(verified){
      const userId =
      typeof verified.payload === 'object' &&
      verified.payload !== null &&
      'user' in verified.payload &&
      typeof verified.payload.user === 'object' &&
      verified.payload.user !== null &&
      'id' in verified.payload.user
        ? parseInt(verified.payload.user.id as string, 10)
        : null;
        if (userId === null) {
          console.log('Invalid JWT payload or missing user ID');
        } else {
          console.log('User ID:', userId);
        }
        const response = await fetch(`${process.env.BASE_URL}/api/getData?userId=${userId}`, {
        method: "GET",
        cache:'no-store',
        headers:{
          'Content-Type':'application/json'
        }
      });
      const query = await response.json();
      console.log("User "+query.userData[0].name+" has login!");
      userName=query.userData[0].name;
      }
    }catch(error){
      console.log("Token has expired",error);
    }
  }
  return (
    <section className="text-gray-600 body-font">
      <h2 className='text-left font-bold text-sm'>User Token Get From Cookie:</h2>
      <p className='text-sm'>{userToken ? userToken : "Token Not exist"}</p><br/>
      <p className='text-lg font-bold text-green-500'>{userName ? "User "+userName+" has login!" : "No user Login!"}</p><br/>

  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
      <Image className="object-cover object-center rounded" alt="hero" src={logo} width={300} height={300}/>
    </div>
    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
      <div className='py-10 bg-slate-500 mb-5 text-white'>
      <PasswordResetForm/>
      </div>
      <LoginUser/>
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Online Education Learning Platform
        <br className="hidden lg:inline-block"/>IT Solution
      </h1>
      <p className="mb-8 leading-relaxed">Learn  Online IT Courses, with a little bit amount that make your future bright</p>
      <div className="flex justify-center">
        <Link href={"/auth/signup"}><button  className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">SignUp</button></Link>
        <Link href={"/auth/signin"} ><button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">SignIn</button></Link>
      </div>
    </div>
  </div>
</section>
  )
}

export default HeroSection