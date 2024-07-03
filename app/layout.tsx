'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import "@/styles/satoshi.css";
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
    document.body.style.fontFamily = 'Satoshi';
  }, [])

  useEffect(() => {
    document.body.style.fontSize = size;
  }, [size])

  return (
    <html lang="en">
      <head>
        <title>Fourstake for Healthcare | All-in-one Business Efficiency Services for Healthcare Providers</title>
        <meta property="og:title" content="Fourstake for Healthcare | All-in-one Business Efficiency Services for Healthcare Providers" key="title" />
      </head>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <UserProvider>
          <DocumentProvider>
            <body className={inter.className + 'bg-white dark:bg-boxdark'}>
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
