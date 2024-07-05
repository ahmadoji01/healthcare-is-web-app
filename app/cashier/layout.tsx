import "@/styles/globals.css";
import "@/styles/data-tables-css.css";
import "@/styles/satoshi.css";
import CashierProviders from "@/contexts/cashier-providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <CashierProviders>
      {children}
    </CashierProviders>
  );
}
