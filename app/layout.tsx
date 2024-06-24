'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { UserProvider, useUserContext } from '@/contexts/user-context';
import { AlertProvider } from '@/contexts/alert-context';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import './i18n';
import { useEffect, useState } from 'react';
import { DocumentProvider } from '@/contexts/document-context';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [size, setSize] = useState("100% !important");

  useEffect(() => {
    let localSize = localStorage.getItem("font-size");
    if (localSize !== null) {
      setSize(localSize);
    }
  }, [])

  useEffect(() => {
    document.body.style.fontSize = size;
  }, [size])

  return (
    <html lang="en">
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <UserProvider>
          <DocumentProvider>
            <body className={inter.className}>
              <AlertProvider>
                {children}
              </AlertProvider>
            </body>
          </DocumentProvider>
        </UserProvider>
      </LocalizationProvider>
    </html>
  )
}
