"use client";
import React, { useState, useEffect } from "react";

const FetchCertificate = () => {
  const [certData, setCertData] = useState([]);

  useEffect(() => {
    const fetchCertificateData = async () => {
      try {
        const Id = "2";
        const response = await fetch(`/api/certificate?certificate_id=${Id}`, {
          method: "GET",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const query = await response.json();
        if (response.ok) {
          console.log("certificate ", query.certificates[0]);
          setCertData(query.certificates);
        } else {
          console.log("certificate ", query.message);
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
      <h2 className="font-bold text-2xl text-blue-500">Certificate Details </h2>
      {
        // Display the certData or any other JSX based on the data you have received
        certData && certData.map((cert:any)=>(
          <>
          <div key={cert._id}></div>
          <h1>Certificate ID: {cert._id}</h1>
          <h2>User ID: {cert.user_id}</h2>
          <h2>completion_date: {formatDate(cert.completion_date)}</h2>
          <h2>issue_date: {formatDate(cert.certificate_issued_date)}</h2>
          </>
        ))
      }
    </div>
  );
};

export default FetchCertificate;
