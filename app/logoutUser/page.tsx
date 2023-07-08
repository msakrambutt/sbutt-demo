"use client"
import Link from 'next/link';
const LogoutUser = async() => {
  let message:string="";
      try {
        const response = await fetch(`/api/logout`, {
          method: "GET",
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const query = await response.json();
        if (response.ok) {
          console.log(query);
          message=query.message;
        } else {
          console.log(query);
          message=query.message;

        }
      } catch (error) {
        console.log("catch error" + error);
      }
     

  return (
    <div>
      <h2 className='font-bold text-red-500'>{message && <p>{message}</p>}</h2>
      <Link href={"/"}>Go to Home Page</Link>
    </div>
  );
}

export default LogoutUser;
