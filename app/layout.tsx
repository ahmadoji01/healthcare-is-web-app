import { Inter } from 'next/font/google';
import './globals.css';
import "@/styles/satoshi.css";
import {AbstractIntlMessages, NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
import Providers from '@/contexts/generic-providers';
import NextIntlWrapper from '@/contexts/next-intl-wrapper';

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <title>Fourstake for Healthcare | All-in-one Business Efficiency Services for Healthcare Providers</title>
        <meta property="og:title" content="Fourstake for Healthcare | All-in-one Business Efficiency Services for Healthcare Providers" key="title" />
      </head>
      <NextIntlWrapper>
        <Providers>
          <body className={inter.className + 'bg-white dark:bg-boxdark'} suppressHydrationWarning={true}>
            {children}
          </body>
        </Providers>
      </NextIntlWrapper>
    </html>
  )
}
