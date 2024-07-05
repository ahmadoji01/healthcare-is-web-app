import "@/styles/globals.css";
import "@/styles/data-tables-css.css";
import "@/styles/satoshi.css";
import { getLocale } from "next-intl/server";
import DoctorProviders from "@/contexts/doctor-providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <DoctorProviders>
      {children}
    </DoctorProviders>
  );
}
