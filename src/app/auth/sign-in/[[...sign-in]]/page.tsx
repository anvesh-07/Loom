import React from "react";
import { SignIn as ClerkSignIn } from "@clerk/nextjs";

const SignIn = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <ClerkSignIn />
    </div>
  );
};

export default SignIn;
