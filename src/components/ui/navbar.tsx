"use client"
import React from 'react';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from "@nextui-org/react";
import Link from 'next/link';
import { Session } from '@prisma/client';
import { ThemeToggle } from '../ThemeToggle';
import { SignInButton } from '../SignInButton';

type NavbarComponentProps = {
    session : any  
}

export const NavbarComponent = ({session}: NavbarComponentProps) => {

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
       "create-course",
       "settings",
    ];

  return (
    <>
     <Navbar className='w-screen border-1' onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">Course GPT</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {
      session?.user && (<>
        <NavbarItem>
          <Link color="foreground" href="#">
            Create-course
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" aria-current="page">
            Settings
          </Link>
        </NavbarItem>
        </>
            )
        }
        
        <NavbarItem>
          <Link color="foreground" href="#">
            <ThemeToggle />
          </Link>
          <Link color="foreground" href="/gallery">
            Gallery
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <SignInButton />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>    
        <NavbarMenuItem>
            {
                session?.user && (<>
                    <Link href={'/create'} className='block mb-2'>
                    Create-course
                    </Link>

                    <Link href={'/create'} className='mb-2'>
                    Settings
                    </Link>
                    </>
                )
            }
            <ThemeToggle className='mt-2'/>
            <Link href={'/gallery'} className='mb-2'>
                    Gallery
            </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
    </>
  );
};