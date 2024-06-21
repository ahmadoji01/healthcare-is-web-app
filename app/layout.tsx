'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { UserProvider, useUserContext } from '@/contexts/user-context';
import { AlertProvider } from '@/contexts/alert-context';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Loader from '@/components/Loader';
import './i18n';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const {loading} = useUserContext();

  return (
    <html lang="en">
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <UserProvider>
          <body className={inter.className}>
            {loading ? (
              <Loader />
            ) : (
              <AlertProvider>
                {children}
              </AlertProvider>
            )}
          </body>
        </UserProvider>
      </LocalizationProvider>
    </html>
  )
}
