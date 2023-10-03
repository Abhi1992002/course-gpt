import React from "react";
import Link from "next/link";
import { SignInButton } from "./SignInButton";
import { getAuthSession } from "@/lib/auth";
import { UserAccountNav } from "./userAccountNav";
import { ThemeToggle } from "./ThemeToggle";

type NavbarProps = {};

export const Navbar = async ({}: NavbarProps) => {
  const session = await getAuthSession();
//   why to use getAuthSession not use session hook

  console.log(session);
  return (
    <>
      <nav className="fixed inset-0 bg-white dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300 py-2">
        <div className="flex items-center justify-center h-full gap-2 px-8 mx-auto sm:justify-between max-w-7xl">
          <Link href={"/gallery"} className="items-center hidden gap-2 sm:flex">
            <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
              CourseGPT
            </p>
          </Link>
          <div className="flex items-center">
            <Link href={"/gallery"} className="mr-3">
              Gallery
            </Link>

            {session?.user && (
              <>
                <Link href={"/create"} className="mr-3">
                  Create Course
                </Link>
                <Link href={"/settings"} className="mr-3">
                  Settings
                </Link>
              </>
            )}

            <ThemeToggle className="mr-3" />

           <div className="flex items-center">
              {
                session?.user ? (<UserAccountNav user={session.user}/>) : (
                    <SignInButton />
                )
              }
           </div>
        
          </div>
        </div>
      </nav>
    </>
  );
};
