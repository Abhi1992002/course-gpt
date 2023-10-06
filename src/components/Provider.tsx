'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import {
  RecoilRoot,
} from 'recoil';
import { NextUIProvider } from '@nextui-org/react';

const queryClient = new QueryClient();

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider {...props}>
        <SessionProvider>
          <RecoilRoot>
            <NextUIProvider>
              {children}
            </NextUIProvider>
          </RecoilRoot>
        </SessionProvider>
      </NextThemesProvider>
    </QueryClientProvider>
  );
}
