"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

type SignInButtonProps = {};

export function SignInButton({}: SignInButtonProps) {
  return (
    <Button
      variant="ghost"
      onClick={() => {
        signIn("google");
      }}
    >
      Sign In
    </Button>
  );
}
