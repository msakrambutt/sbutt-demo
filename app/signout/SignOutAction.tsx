"use client";

import { useEffect, useRef } from "react";

interface SignOutActionProps {
  deleteTokens: () => Promise<void>;
}


export default function SignOutAction({ deleteTokens}: SignOutActionProps) {
  const deleteTokensRef = useRef(deleteTokens);

  useEffect(() => {
    console.log("useEffect is calling");
    deleteTokensRef.current = deleteTokens;
  });

  
  useEffect(() => {
    alert("cookie has been delete from browsers");
    deleteTokensRef.current();
  }, []);
  return null;
}