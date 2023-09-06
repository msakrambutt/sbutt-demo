"use client";
import React, { useState, useEffect } from "react";

const FetchCertificateByUserId = () => {
  const [certData, setCertData] = useState([]);
  const [userName,setUserName]=useState('');

  useEffect(() => {
    const fetchCertificateData = async () => {
      try {
        const id = "1";
        const response = await fetch(`/api/certificate/${id}`, {
          method: "GET",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const query = await response.json();
        if (response.ok) {
          console.log("certificate by userId ", query.result);
          setUserName(query.result.username);
          setCertData(query.result.certificates);
        } else {
          console.log("certificate by User ID", query.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCertificateData();
  }, []); // Empty dependency array to ensure this effect runs only once on component mount

  const formatDate = (dateString:any) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
  };

  return (
    <div>
      <h2 className="font-bold text-2xl text-blue-500">Certificate Details By User ID</h2>
      <h1 className="text-xl font-bold">User Name: {userName}</h1><hr className="h-5"/>

      {
        // Display the certData or any other JSX based on the data you have received
        certData && certData.map((cert:any)=>(
          <>
          <div key={cert._id}></div>
          <h2>Certificate ID: {cert.certificate_ID}</h2>
          <h2>Course ID: {cert.course_id}</h2>
          <h2>certificate_issue_date: {formatDate(cert.certificate_issue_date)}</h2><hr/><hr/>
          </>
        ))
      }
    </div>
  );
};

export default FetchCertificateByUserId;

