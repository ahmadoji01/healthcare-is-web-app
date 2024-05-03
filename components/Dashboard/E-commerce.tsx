"use client";
import React from "react";
import ChartOne from "./Charts/ChartOne";
import ChartThree from "./Charts/ChartThree";
import ChartTwo from "./Charts/ChartTwo";
import ChatCard from "./Chat/ChatCard";
import TableOne from "./Tables/TableOne";
import CardDataStats from "./CardDataStats";
// import Map from "../Maps/TestMap";

// without this the component renders on server and throws an error
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faMedkit, faPills, faTimesCircle, faUser, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
const MapOne = dynamic(() => import("./Maps/MapOne"), {
  ssr: false,
});

const ECommerce: React.FC = () => {
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
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default ECommerce;
