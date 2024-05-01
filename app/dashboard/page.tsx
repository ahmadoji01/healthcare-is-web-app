'use client';

import CardDataStats from "@/components/Dashboard/CardDataStats";
import ChartOne from "@/components/Dashboard/Charts/ChartOne";
import ChartThree from "@/components/Dashboard/Charts/ChartThree";
import ChartTwo from "@/components/Dashboard/Charts/ChartTwo";
import ChatCard from "@/components/Dashboard/Chat/ChatCard";
import MapOne from "@/components/Dashboard/Maps/MapOne";
import TableOne from "@/components/Dashboard/Tables/TableOne";
import { faClock, faPills, faUser, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardHome = () => {

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Visits This Week" total="$3.456K" rate="0.43%" levelUp>
          <FontAwesomeIcon icon={faUser} width={22} />
        </CardDataStats>
        <CardDataStats title="Total Visits All Time" total="$45,2K" rate="4.35%" levelUp>
          <FontAwesomeIcon icon={faClock} width={22} />
        </CardDataStats>
        <CardDataStats title="Total Medicines" total="2.450" rate="2.59%" levelUp>
          <FontAwesomeIcon icon={faPills} width={22} />
        </CardDataStats>
        <CardDataStats title="Total Staffs" total="3.456" rate="0.95%" levelDown>
          <FontAwesomeIcon icon={faUserDoctor} width={22} />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartThree />
        <div className="col-span-12">
          <TableOne />
        </div>
      </div>
    </>
  );
}

export default DashboardHome;