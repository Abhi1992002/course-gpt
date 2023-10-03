
import { cn } from '@/lib/utils'
import './globals.css'
import type { Metadata } from 'next'
import {Lexend} from 'next/font/google'

import { Providers } from '@/components/Provider'
import { Toaster } from "@/components/ui/toaster"
import Navbar from '@/components/home/Navbar'


const lexend = Lexend({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: 'Course GPT',
  description: 'Create a complete course using AI',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(lexend.className , "antialiased min-h-screen pt-16")}>
        <Providers attribute="class" defaultTheme="system" enableSystem>
        <Navbar />
        {children}
        </Providers>
        <Toaster />
        </body>
 
    </html>
  )
}
