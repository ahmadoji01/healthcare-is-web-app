'use client';

import { Inter } from 'next/font/google'
import './globals.css'
import { UserProvider, useUserContext } from '@/contexts/user-context'
import { AlertProvider } from '@/contexts/alert-context';
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
    </html>
  )
}
