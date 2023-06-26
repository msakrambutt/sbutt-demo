"use client"
import FeaturesSection from "../components/all-other/featuressection";
import Header from "@/components/all-other/header";
// import Navbar from "@/components/navbar/navbar";
// import Footer from "@/components/all-other/footer";
// import Underfooter from "@/components/all-other/underfooter";
import Newsteller from "@/components/all-other/newsteller";
import Promotion from "@/components/all-other/promotions";
import Swipper from "@/components/all-other/swipper";
import { useState } from 'react';


export default function Home() {
  const [token, setToken] = useState('');
  const handleGenerateToken = async () => {
    const payload = {
      clientName: "shahid",
      clientEmail: 'msakrambutt@gmail.com',
      clientPwd:'555',
      client_role:'admin'
    };
  
  const response = await fetch('/api/api-client/', {
      
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
    console.log(data);
    setToken(data.authToken);
  }

  }

  return (
    <>
      <div className="bg-white w-auto h-auto">
        {/* <Navbar /> */}
        {/* <Header />
        <Promotion />
        <Swipper />
        <FeaturesSection />
        <Newsteller /> */}
        {/* <Footer />
        <Underfooter /> */}
        <div>
        <button onClick={handleGenerateToken}>Generate JWT</button>
        {token && <p>{token}</p>}
        </div>
      </div>
    </>
  );
}
