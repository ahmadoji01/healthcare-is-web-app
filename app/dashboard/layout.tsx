import "@/styles/globals.css";
import "@/styles/data-tables-css.css";
import "@/styles/satoshi.css";
import DashboardProviders from "@/contexts/dashboard-providers";
import { getLocale } from "next-intl/server";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body suppressHydrationWarning={true}>
        <DashboardProviders>
          {children}
        </DashboardProviders>
      </body>
    </html>
  );
}
