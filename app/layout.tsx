'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { UserProvider, useUserContext } from '@/contexts/user-context';
import { AlertProvider } from '@/contexts/alert-context';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Loader from '@/components/Loader';
import './i18n';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [size, setSize] = useState("100%");

  return (
    <html lang="en">
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <UserProvider>
          <body className={inter.className} style={ { fontSize: size } }>
            <AlertProvider>
              {children}
            </AlertProvider>
          </body>
        </UserProvider>
      </LocalizationProvider>
    </html>
  )
}
