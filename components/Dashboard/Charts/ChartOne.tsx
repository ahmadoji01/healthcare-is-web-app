"use client";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { monthlySalesMapper } from "@/modules/orders/domain/order";
import { useTranslation } from "react-i18next";
import { useUserContext } from "@/contexts/user-context";
import { useAlertContext } from "@/contexts/alert-context";
import { statusFilter, yearFilter } from "@/modules/orders/domain/order.specifications";
import { ORDER_STATUS } from "@/modules/orders/domain/order.constants";
import { getTotalSales } from "@/modules/orders/domain/order.actions";
import { currency } from "@/utils/generic-functions";
import { useTranslations } from "next-intl";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: "straight",
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
    formatter: function (val:number) {
      return currency(val);
    },
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#3056D3", "#80CAEE"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: "category",
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      formatter: function (val:number) {
        return currency(val);
      },
    },
    title: {
      style: {
        fontSize: "0px",
      },
    },
    min: 0,
    max: 1000000,
  },
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartOne = () => {

  const t = useTranslations();
  const [chartOptions, setChartOptions] = useState(options);
  const dateNow = new Date;
  const {accessToken} = useUserContext();
  const {openSnackbarNotification} = useAlertContext();
  const [thisYearSales, setThisYearSales] = useState<number[]>([0,0,0,0,0,0,0,0,0,0,0,0]);
  const [lastYearSales, setLastYearSales] = useState<number[]>([0,0,0,0,0,0,0,0,0,0,0,0]);

  const setYAxisMax = (val:number) => {
    if (val <= 0) {
      return;
    }
    let newOpts = {...chartOptions};
    let yAxis = {...chartOptions.yaxis};
    setChartOptions(newOpts);
    if (yAxis.max < val) {
      yAxis.max = val + (0.2 * val);
      newOpts.yaxis = yAxis;
      setChartOptions(newOpts);
    }
  }

  const stateSetter = (thisYear:number[], lastYear:number[]) => {
    setState({
      series: [
        {
          name: t('monthly_sales_in') + dateNow.getFullYear(),
          data: thisYear,
        },
        {
          name: t('monthly_sales_in') + (dateNow.getFullYear() - 1),
          data: lastYear,
        }
      ]
    })
  }

  const [state, setState] = useState<ChartOneState>({
    series: [
      {
        name: t('monthly_sales_in') + dateNow.getFullYear(),
        data: thisYearSales,
      },

      {
        name: t('monthly_sales_in') + (dateNow.getFullYear() - 1),
        data: lastYearSales,
      },
    ],
  });

  useEffect( () => {
    let dateNow = new Date;
    let filter = { _and: [ statusFilter(ORDER_STATUS.paid), yearFilter(dateNow.getFullYear()) ] };
    let monthlySales = [...thisYearSales];
    getTotalSales(accessToken, filter, 'month(date_updated)')
      .then( res => {
        if (res.length > 0) {
          res.map( (sales) => {
            let sls = monthlySalesMapper(sales);
            monthlySales[sls.date_updated_month] = sls.total;
          });
        }
        setYAxisMax(Math.max(...monthlySales));
        setThisYearSales(monthlySales);
      })
      .catch( () => openSnackbarNotification(t('alert_msg.server_error'), 'error'));
  }, []);

  useEffect( () => {
    let dateNow = new Date;
    let filter = { _and: [ statusFilter(ORDER_STATUS.paid), yearFilter(dateNow.getFullYear()-1) ] };
    let monthlySales = [...lastYearSales];
    getTotalSales(accessToken, filter, 'month(date_updated)')
      .then( res => {
        if (res.length > 0) {
          res.map( (sales) => {
            let sls = monthlySalesMapper(sales);
            monthlySales[sls.date_updated_month] = sls.total;
          });
        }
        setYAxisMax(Math.max(...monthlySales));
        setLastYearSales(monthlySales);
      })
      .catch( () => openSnackbarNotification(t('alert_msg.server_error'), 'error'));
  }, [thisYearSales]);

  
  useEffect( () => {
    stateSetter(thisYearSales, lastYearSales);
  }, [lastYearSales])

  const isWindowAvailable = () => typeof window !== "undefined";

  if (!isWindowAvailable()) return <></>;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-7">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">{ t('monthly_sales_in') + dateNow.getFullYear() }</p>
              <p className="text-sm font-medium">01.01.{ dateNow.getFullYear() } - 31.12.{ dateNow.getFullYear() }</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">{ t('monthly_sales_in') + (dateNow.getFullYear()-1) }</p>
              <p className="text-sm font-medium">01.01.{ dateNow.getFullYear()-1 } - 31.12.{ dateNow.getFullYear()-1 }</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5 h-[355px] w-[105%]">
          { typeof(state) !== 'undefined' &&
            <ReactApexChart
              options={chartOptions}
              series={state.series}
              type="area"
              width="100%"
              height="100%"
            />
          }
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
