'use client';

import CardDataOverview from "@/components/Dashboard/CardDataOverview";
import ChartOne from "@/components/Dashboard/Charts/ChartOne";
import ChartThree from "@/components/Dashboard/Charts/ChartThree";
import { faClock, faPills, faUser, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardHome = () => {

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataOverview title="Total Visits This Month" total="$3.456K">
          <FontAwesomeIcon icon={faUser} width={22} />
        </CardDataOverview>
        <CardDataOverview title="Total Visits All Time" total="$45,2K">
          <FontAwesomeIcon icon={faClock} width={22} />
        </CardDataOverview>
        <CardDataOverview title="Most Sold Medicines" total="2.450">
          <FontAwesomeIcon icon={faPills} width={22} />
        </CardDataOverview>
        <CardDataOverview title="Total Medicines" total="3.456">
          <FontAwesomeIcon icon={faUserDoctor} width={22} />
        </CardDataOverview>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartThree />
      </div>
    </>
  );
}

export default DashboardHome;