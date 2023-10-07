"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";
import { SignInButton } from "../SignInButton";
import { UserAccountNav } from "../userAccountNav";

type NavbarComponentProps = {
  session: any;
};

export function NavbarComponent({ session }: NavbarComponentProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar
      className="w-screen h-[70px] border-1"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit">
            Course GPT
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {session?.user && (
          <>
            <NavbarItem>
              <Link color="foreground" href="/create">
                Create-course
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/settings">Settings</Link>
            </NavbarItem>
          </>
        )}
        <NavbarItem>
          <Link color="foreground" href="/gallery">
            Gallery
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" className="block" href="#">
            <ThemeToggle />
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {session?.user ? (
            <UserAccountNav user={session?.user} />
          ) : (
            <SignInButton />
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          {session?.user && (
            <>
              <Link href="/create" className="block mb-2">
                Create-course
              </Link>

              <Link href="/settings" className="mb-2 block">
                Settings
              </Link>
            </>
          )}
          <Link href="/gallery" className="mb-2 block">
            Gallery
          </Link>
          <ThemeToggle className="mt-2 block" />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
