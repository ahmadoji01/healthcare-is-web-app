import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Dashboard/Tables/TableOne";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Tables Page | Next.js E-commerce Dashboard Template",
  description: "This is Tables page for TailAdmin Next.js",
};

const VisitsDashboardPage = () => {
  return (
    <>
      <Breadcrumb pageName="Visits" />

      <div className="flex flex-col gap-10">
        <TableOne />
      </div>
    </>
  );
};

export default VisitsDashboardPage;