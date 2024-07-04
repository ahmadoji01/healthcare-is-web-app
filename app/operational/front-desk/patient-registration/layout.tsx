import "@/styles/globals.css";
import "@/styles/data-tables-css.css";
import "@/styles/satoshi.css";
import { getLocale } from "next-intl/server";
import PatientRegistrationProviders from "@/contexts/patient-registration-providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const locale = await getLocale();

  return (
    <PatientRegistrationProviders>
      {children}
    </PatientRegistrationProviders>
  );
}