import { BRAND } from "@/types/brand";
import { Visit } from "../domain/visit";
import moment from "moment";

interface VisitListProps {
    visits: Visit[],
}

const VisitList = ({ visits }:VisitListProps) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Date
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Patient's Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Doctor's Name
            </h5>
          </div>
        </div>

        {visits?.map((visit, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-3 ${
              key === visits.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block">
                { moment(visit.date_created).format("MMMM Do YYYY") }
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{visit.patient.name}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{visit.doctor.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitList;
