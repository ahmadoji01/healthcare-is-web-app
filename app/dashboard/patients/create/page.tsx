import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import PatientForm from "@/modules/patients/application/form/patient.form";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Form Elements Page | Next.js E-commerce Dashboard Template",
  description: "This is Form Elements page for TailAdmin Next.js",
  // other metadata
};

const PatientCreatePage = () => {
  return (
    <>
      <Breadcrumb pageName="Add Patient" />
      <PatientForm />
    </>
  );
};

export default PatientCreatePage;
