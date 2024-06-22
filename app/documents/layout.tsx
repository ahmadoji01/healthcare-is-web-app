'use client';

import { Inter } from 'next/font/google';
import { UserProvider, useUserContext } from '@/contexts/user-context';
import { AlertProvider } from '@/contexts/alert-context';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Loader from '@/components/Loader';
import { PDFViewer } from '@react-pdf/renderer';
import OrderDocument from './orders/page';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const {loading} = useUserContext();

  return (
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <UserProvider>
            <PDFViewer>
                <OrderDocument />
            </PDFViewer>
        </UserProvider>
      </LocalizationProvider>
  )
}
