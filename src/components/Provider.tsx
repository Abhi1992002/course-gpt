"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types" 
import {QueryClient , QueryClientProvider} from '@tanstack/react-query'
import {SessionProvider} from 'next-auth/react'
import {
  RecoilRoot,
} from 'recoil';

const queryClient = new QueryClient()

export function Providers({ children, ...props }: ThemeProviderProps) {
  return( 
    <QueryClientProvider client={queryClient}>
   <NextThemesProvider {...props}>
    <SessionProvider>
      <RecoilRoot>
    {children}
     </RecoilRoot>
    </SessionProvider>
    </NextThemesProvider>
    </QueryClientProvider>
)}
