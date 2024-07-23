import { Inter } from 'next/font/google';
import './globals.css';
import "@/styles/satoshi.css";
import {getLocale} from 'next-intl/server';
import Providers from '@/contexts/generic-providers';
import NextIntlWrapper from '@/contexts/next-intl-wrapper';
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const locale = await getLocale();

  return (
    <html lang={locale}>
      <head>
        <title>Fourstake for Healthcare | All-in-one Business Efficiency Services for Healthcare Providers</title>
        <meta property="og:title" content="Fourstake for Healthcare | All-in-one Business Efficiency Services for Healthcare Providers" key="title" />
      </head>
      <NextIntlWrapper>
        <Providers>
          <body suppressHydrationWarning={true} className={inter.className + 'bg-white dark:bg-boxdark'}>
            <NextTopLoader />
            {children}
          </body>
        </Providers>
      </NextIntlWrapper>
    </html>
  )
}
