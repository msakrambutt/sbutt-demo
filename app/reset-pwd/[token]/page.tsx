"use client";
import { useState } from 'react';

const ResetPassword = ({params}:any) => {
  const tokenAndEmail = params.token; // Assuming the concatenated token and email is received as a parameter
  const encodedDelimiter = '%7C'; // URL-encoded delimiter '|'
  const delimiter = '|';
  
  const decodedTokenAndEmail = tokenAndEmail.replace(encodedDelimiter, delimiter);
  const [token, encodedEmail] = decodedTokenAndEmail.split(delimiter);
  const clientEmail = decodeURIComponent(encodedEmail);
    // alert(token);
    // alert(clientEmail);

 
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [message, setMessage] = useState('');


  const handleResetPassword = async (e:any) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setResetError('Passwords do not match');
      return;
    }

    try {
      // Send a request to your backend API to reset the password
      const response = await fetch('/api/password-verify', {
        method: 'POST',
        cache:'no-store',
        body: JSON.stringify({ token,clientEmail,newPassword }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(response.status);
      if (response.ok) {
        setResetSuccess(true);
        setMessage(data.message);
      } else {
        setResetError('Failed to reset password. Please try again.');
        setMessage(data.message);
      }
    } catch (error) {
      setResetError('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className='lg:w-full md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0'>
      <h1 className="text-gray-900 text-lg font-medium title-font mb-5">Reset Password Page</h1>
      {resetSuccess ? (
        <div>
          <p>{message}</p>
          {/* Add any additional success message or UI here */}
        </div>
      ) : (
        <form onSubmit={handleResetPassword}>
          <div className="relative mb-4">
            <label htmlFor="newPassword" className="leading-7 text-sm text-gray-600">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="confirmPassword" className="leading-7 text-sm text-gray-600">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          {resetError && <p>{resetError}</p>}
          <button type="submit"  className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" >Reset Password</button>
        </form>
      )}
          {/* <h1>{token}</h1> */}

    </div>
    

  );
};

export default ResetPassword;
