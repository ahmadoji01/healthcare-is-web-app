'use client';

import CardDataOverview from "@/components/Dashboard/CardDataOverview";
import CardDataStats from "@/components/Dashboard/CardDataStats";
import ChartOne from "@/components/Dashboard/Charts/ChartOne";
import ChartThree from "@/components/Dashboard/Charts/ChartThree";
import Spinner from "@/components/Spinner";
import { useUserContext } from "@/contexts/user-context";
import VisitList from "@/modules/visits/application/visit.list";
import { Visit, visitMapper } from "@/modules/visits/domain/visit";
import { getAllVisits } from "@/modules/visits/domain/visits.actions";
import { faClock, faPills, faUser, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const DashboardHome = () => {

  const {accessToken} = useUserContext();
  const [visits, setVisits] = useState<Visit[]>([]);
  const [totalPages] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect( () => {
    if (!dataLoaded) {
      getAllVisits(accessToken, 1)
        .then( res => {
          let vits:Visit[] = [];
          res?.map( (visit) => { vits.push(visitMapper(visit)); });
          setVisits(vits);
          setDataLoaded(true);
        });
    }
  }, [visits]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataOverview title="Total Visits This Week" total="$3.456K">
          <FontAwesomeIcon icon={faUser} width={22} />
        </CardDataOverview>
        <CardDataOverview title="Total Visits All Time" total="$45,2K">
          <FontAwesomeIcon icon={faClock} width={22} />
        </CardDataOverview>
        <CardDataOverview title="Total Medicines" total="2.450">
          <FontAwesomeIcon icon={faPills} width={22} />
        </CardDataOverview>
        <CardDataOverview title="Total Staffs" total="3.456">
          <FontAwesomeIcon icon={faUserDoctor} width={22} />
        </CardDataOverview>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartThree />
        { !dataLoaded && <Spinner /> }
        { dataLoaded &&
          <>
            <h4 className="col-span-12 text-3xl font-semibold text-black dark:text-white">
              Recent Visits
            </h4>
            <div className="col-span-12">
              <VisitList totalPages={totalPages} visits={visits} />
            </div>
          </>
        }
      </div>
    </>
  );
}

export default DashboardHome;