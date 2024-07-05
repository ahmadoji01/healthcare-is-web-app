import "@/styles/globals.css";
import "@/styles/data-tables-css.css";
import "@/styles/satoshi.css";
import QueueManagerProviders from "@/contexts/queue-manager-providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <QueueManagerProviders>
      {children}
    </QueueManagerProviders>
  );
}