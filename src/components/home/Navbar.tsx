import React from 'react';
import Link from 'next/link';
import { getAuthSession } from '@/lib/auth';
import { ThemeToggle } from '../ThemeToggle';
import { UserAccountNav } from '../userAccountNav';
import { SignInButton } from '../SignInButton';
type NavbarProps = {}

 const Navbar = async({}: NavbarProps) => {

  const session = await getAuthSession()

  return (
    <div className='w-[900px] max-w-[90vw] py-[15px] px-[20px] fixed top-[20px] left-[50%] rounded-full translate-x-[-50%]  bg-background/80 backdrop-blur-sm border border-foreground/40 z-[2] flex items-center'>
       <div className='lg:text-lg md:text-md text-sm font-bold uppercase flex-1'>
        <Link href={'/gallery'} className='lg:text-lg md:text-md text-sm'>
          courseGPT HEllo
        </Link>
      
       </div>
       <div className='flex-2 sm:flex flex-rows md:gap-[50px] gap-[20px] items-center hidden '>
  {
    session?.user && (
      <div className='flex flex-rows md:gap-[50px] gap-[20px]'>
         <Link href={"/create"} className=' md:text-md text-sm'>
            Create-Course
          </Link>
           <Link href={"/settings"} className=" md:text-md text-sm">
                  Settings
            </Link>
      </div>
    )
  }
         
          <Link href={'gallery'} className=" md:text-md text-sm">
             Gallery
          </Link>
        <ThemeToggle />
       </div>

       <div className='flex-1 flex justify-end'>
       {
        session?.user ? (<UserAccountNav user={session.user}/>) : (
                    <SignInButton />
                )
              }
       </div>
    </div>
  );
};

export default Navbar