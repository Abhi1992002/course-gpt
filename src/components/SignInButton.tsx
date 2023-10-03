"use client"
import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

type SignInButtonProps = {};

export const SignInButton = ({}: SignInButtonProps) => {
 return ( <>
    <Button
      variant={"ghost"}
      onClick={() => {
        signIn("google");
      }}
    >
      Sign In
    </Button>
  </> 
 )
};
