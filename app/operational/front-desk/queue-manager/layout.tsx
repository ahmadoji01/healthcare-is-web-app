import "@/styles/globals.css";
import "@/styles/data-tables-css.css";
import "@/styles/satoshi.css";
import { getLocale } from "next-intl/server";
import QueueManagerProviders from "@/contexts/queue-manager-providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const locale = await getLocale();

  return (
    <QueueManagerProviders>
      {children}
    </QueueManagerProviders>
  );
}