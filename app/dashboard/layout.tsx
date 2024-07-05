import "@/styles/globals.css";
import "@/styles/data-tables-css.css";
import "@/styles/satoshi.css";
import DashboardProviders from "@/contexts/dashboard-providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <DashboardProviders>
      {children}
    </DashboardProviders>
  );
}
