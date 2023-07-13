import Image from 'next/image'
import React from 'react'
import logo from "../../dine-hackathon/pics/logo.jpeg";
import Link from 'next/link';
import PasswordResetForm from '../app/PasswordResetForm/page';
import User_Token from '../app/getTokenFromCookie/cookies';
import { jwtVerify } from 'jose';
import SignOut from '@/app/signout/page';
import jwt,{JwtPayload} from "jsonwebtoken";


let JWT_SECRET_KEY: string;
if (typeof process.env.SECRET_KEY === "string") {
  JWT_SECRET_KEY = process.env.SECRET_KEY;
}

const HeroSection = async() => {
  const token = await User_Token();
  


  console.log("herosection",token);
  let userName:string="";
  if(token){
    try{
      const verified = await jwtVerify(
        token,
        new TextEncoder().encode(JWT_SECRET_KEY)
      );
      if(verified){
      //first method to get userid from token
      const decodeToken=jwt.verify(token,JWT_SECRET_KEY) as JwtPayload;
      console.log("decode Token "+decodeToken.user.id);
      const userId=decodeToken.user.id;
     

  //     console.log("token verify",verified);
  //     if(verified){
  //     const userId =
  //     typeof verified.payload === 'object' &&
  //     verified.payload !== null &&
  //     'user' in verified.payload &&
  //     typeof verified.payload.user === 'object' &&
  //     verified.payload.user !== null &&
  //     'id' in verified.payload.user
  //       ? verified.payload.user.id
  //       : null;
  //       if (userId === null) {
  //         console.log('Invalid JWT payload or missing user ID');
  //       } else {
  //         // console.log('User ID:', userId);
  //       }
        console.log("userId ",userId);
        const response = await fetch(`${process.env.BASE_URL}/api/getData?userId=${userId}`, {
        method: "GET",
        cache:'no-store',
        headers:{
          'Content-Type':'application/json'
        }
      });
      const query = await response.json();
      console.log("User "+query.userData[0].name+" has login!");
      userName=query.userData[0].name ;
      console.log(query.message);
    }
    }catch(error){
      console.log("Token has expired",error);
    }
  }
  return (
    <section className="text-gray-600 body-font">
      <h2 className='text-left font-bold text-sm'>User Token Get From Cookie:</h2>
      <p className='text-sm'>{token ? token : "Token Not exist"}</p><br/>
      <p className='text-lg font-bold text-green-500'>{userName && userName? "User "+userName+" has login!" : "No user Login!"}</p><br/>
      {/* Cookie deletion route */}
      {/* <div><Link href={"/signout"}>Signout User! on Client side</Link></div>  */}
      <div><Link href={"/logoutUser"}>Signout User!.</Link></div> 
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
      <Image className="object-cover object-center rounded" alt="hero" src={logo} width={300} height={300}/>
    </div>
    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
      <div className='py-10 bg-slate-500 mb-5 text-white'>
      <PasswordResetForm/>
      </div>
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