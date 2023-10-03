"use client"
// how to find if a component is client side or a server side

import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from './ui/button';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { UserAvatar } from './userAvatar';

type userAccountNanProps = {
    user : User
}

export const UserAccountNav = ({user}: userAccountNanProps) => {

  return (
    <>
       <DropdownMenu>
  <DropdownMenuTrigger>

    <UserAvatar user={user} />
     
  </DropdownMenuTrigger>
  <DropdownMenuContent align='end'>
    {/* check some tailwind property here */}
       <div className='flex items-center justify-start gap-2 p-2'>
        <div className='flex flex-col space-y-1 leading-none'>
        {
             user?.name && (<p className='font-medium'>{user.name}</p>)
             }
             {
             user?.email && (<p className='w-[220px] truncate text-sm text-secondary-foreground'>{user.email}</p>)
             }
        </div>
           
       </div>
       <DropdownMenuSeparator/>
        <DropdownMenuItem className='text-red-600 cursor-pointer' onSelect={()=>{signOut()}}>
            SignOut
            <LogOut className='w-4 h-4 ml-2' />
        </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

    </>
  );
};