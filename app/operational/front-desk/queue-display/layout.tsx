import "@/styles/globals.css";
import "@/styles/data-tables-css.css";
import "@/styles/satoshi.css";
import { getLocale } from "next-intl/server";
import QueueDisplayProviders from "@/contexts/queue-display-providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body suppressHydrationWarning={true}>
        <QueueDisplayProviders>
          {children}
        </QueueDisplayProviders>
      </body>
    </html>
  );
}