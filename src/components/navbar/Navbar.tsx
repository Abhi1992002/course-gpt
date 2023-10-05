import React from 'react';
import Link from 'next/link';
import { getAuthSession } from '@/lib/auth';
import { NavbarComponent } from '../ui/navbar';
import { Session } from '@prisma/client';
// import { ThemeToggle } from '../ThemeToggle';
// import { UserAccountNav } from '../userAccountNav';
// import { SignInButton } from '../SignInButton';


 const Navbars = async() => {

  const session = await getAuthSession()

  return ( <>
       {/* <div className='lg:text-lg md:text-md text-sm font-bold uppercase flex-1'>
        <Link href={'/gallery'} className='lg:text-lg md:text-md text-sm'>
          courseGPT
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
       </div> */}
      
      <NavbarComponent session={session}/>
    </>
  );
};

export default Navbars