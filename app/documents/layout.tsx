'use client';

import { DocumentProps, PDFViewer } from '@react-pdf/renderer';
import { JSXElementConstructor, ReactElement } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
