"use client";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getVisitByCount } from "@/modules/visits/domain/visits.actions";
import { useUserContext } from "@/contexts/user-context";
import { VISIT_STATUS } from "@/modules/visits/domain/visit.constants";
import { monthFilter } from "@/utils/generic-filters";
import { statusEquals } from "@/modules/visits/domain/visit.specifications";
import { VisitCount, VisitCountDoctor, visitCountMapper } from "@/modules/visits/domain/visit";
import { getDoctorsWithFilter } from "@/modules/doctors/domain/doctors.actions";
import { doctorIDsInFilter } from "@/modules/doctors/domain/doctor.specifications";
import { DoctorName } from "@/utils/doctor-name-format";
import { randomHexColorGenerator } from "@/utils/generic-functions";
import { useTranslations } from "next-intl";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ChartThreeState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    type: "donut",
  },
  colors: [],
  labels: [],
  legend: {
    show: true,
    position: "bottom",
  },

  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
          height: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
          height: 200,
        },
      },
    },
  ],
};

const ChartThree = () => {
  const [series, setSeries] = useState([65, 34, 12, 56]);
  const [chartOpts, setChartOpts] = useState(options);
  const [counts, setCounts] = useState<VisitCount[]>([]);
  const [visitCountDoctors, setVisitCountDoctors] = useState<VisitCountDoctor[]>([]);
  const {accessToken, user} = useUserContext();
  const t = useTranslations();

  if (!series.length || !series) {
    return null;
  }

  useEffect( () => {
    let dateNow = new Date;
    let filter = { _and: [ statusEquals(VISIT_STATUS.examined), monthFilter(dateNow.getMonth()+1) ] }
    getVisitByCount(accessToken, filter, 'doctor')
      .then( res => {
        let cnts:VisitCount[] = [];
        res?.map( (cnt) => cnts.push(visitCountMapper(cnt)));
        setCounts(cnts);
      })
  }, []);

  useEffect( () => {
    if (counts.length <= 0)
      return;

    let ids:number[] = [];
    counts.map( count => ids.push(count.doctor) );

    getDoctorsWithFilter(accessToken, doctorIDsInFilter(ids))
      .then( (res) => {
        let result:VisitCountDoctor[] = res?.reduce((acc, b) => {
          const idx = acc.findIndex(item => item.doctor === b.id);
          if (idx > -1) {
            acc[idx] = Object.assign(b, acc[idx]);
            return acc;
          }
          return [...acc, b];
        }, counts);
        setVisitCountDoctors(result);
      })
  }, [counts]);

  useEffect( () => {
    if (visitCountDoctors.length <= 0)
      return;

    let newOpts = {...chartOpts};
    let newLabels:string[] = []; 
    let newColors:string[] = [];
    let newSeries:number[] = [];
    visitCountDoctors.map( (cnt) => {
      newLabels.push(DoctorName(cnt.name, cnt.specialization));
      newColors.push(randomHexColorGenerator());
      newSeries.push(cnt.count);
    });
    newOpts.labels = newLabels;
    newOpts.colors = newColors;
    setChartOpts(newOpts);
    setSeries(newSeries);
  }, [visitCountDoctors])

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            { t('doctor_visit_analytics') }
          </h5>
        </div>
        <div>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          { visitCountDoctors.length > 0 ?
          <ReactApexChart
            options={chartOpts}
            series={series}
            type="donut"
          />
          : <h5 className="text-xl font-semibold text-black dark:text-white">
              { t('this_months_data_not_available') }
            </h5>
          }
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
