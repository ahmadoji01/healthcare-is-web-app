import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Dashboard/Tables/TableOne";
import TableThree from "@/components/Dashboard/Tables/TableThree";
import TableTwo from "@/components/Dashboard/Tables/TableTwo";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Tables Page | Next.js E-commerce Dashboard Template",
  description: "This is Tables page for TailAdmin Next.js",
  // other metadata
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne />
        <TableTwo />
        <TableThree />
      </div>
    </>
  );
};

export default TablesPage;
