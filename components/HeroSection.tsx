import Image from 'next/image'
import React from 'react'
import logo from "../../dine-hackathon/pics/logo.jpeg";
import Link from 'next/link';


const HeroSection = () => {
  return (
    <section className="text-gray-600 body-font">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
      <Image className="object-cover object-center rounded" alt="hero" src={logo} width={300} height={300}/>
    </div>
    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
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