'use client';

import CardDataOverview from "@/components/Dashboard/CardDataOverview";
import ChartOne from "@/components/Dashboard/Charts/ChartOne";
import ChartThree from "@/components/Dashboard/Charts/ChartThree";
import { useUserContext } from "@/contexts/user-context";
import { ITEM_TYPE } from "@/modules/items/domain/item.constants";
import { getAnItem } from "@/modules/items/domain/items.actions";
import { defaultMedicine, medicineMapper } from "@/modules/medicines/domain/medicine";
import { ItemQuantitySold, itemQuantitySoldMapper, monthlySalesMapper } from "@/modules/orders/domain/order";
import { getQuantityCountByItems, getTotalSales } from "@/modules/orders/domain/order.actions";
import { itemTypeFilter, monthFilter, orderStatusFilter, statusFilter, yearFilter } from "@/modules/orders/domain/order.specifications";
import { VISIT_STATUS } from "@/modules/visits/domain/visit.constants";
import { getTotalVisitsWithFilter } from "@/modules/visits/domain/visits.actions";
import { faClock, faPills, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const DashboardHome = () => {

  const t = useTranslations();
  const {accessToken, user, organization} = useUserContext();

  const [totalMonthlyVisits, setTotalMonthlyVisits] = useState(0);
  const [totalAllVisits, setTotalAllVisits] = useState(0);
  const [topMedsSold, setTopMedsSold] = useState<ItemQuantitySold[]>([]);
  const [topMed, setTopMed] = useState(defaultMedicine);

  useEffect( () => {
    let dateNow = new Date;
    let filter = { _and: [ statusFilter(VISIT_STATUS.examined), monthFilter(dateNow.getMonth()+1), yearFilter(dateNow.getFullYear()) ] }
    getTotalVisitsWithFilter(accessToken, filter)
      .then( res => { 
        let total = res[0].count? parseInt(res[0].count) : 0;
        setTotalMonthlyVisits(total);
      });
    getTotalVisitsWithFilter(accessToken, statusFilter(VISIT_STATUS.examined))
      .then( res => { 
        let total = res[0].count? parseInt(res[0].count) : 0;
        setTotalAllVisits(total);
      });

    let qtySold:ItemQuantitySold[] = [];
    filter = { _and: [ itemTypeFilter(ITEM_TYPE.medicine), monthFilter(dateNow.getMonth()+1) ] }
    getQuantityCountByItems(accessToken, itemTypeFilter(ITEM_TYPE.medicine))
      .then( res => { 
        res?.map( (item) => qtySold.push(itemQuantitySoldMapper(item)));
        setTopMedsSold(qtySold);
      });
  }, []);

  useEffect( () => {
    if (topMedsSold.length > 0) {
      getAnItem(accessToken, topMedsSold[0].item)
        .then( res => {
          let med = medicineMapper(res);
          setTopMed(med);
        });
    }
  }, [topMedsSold])

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Hi, {user.first_name}. {t('dashboard_welcome')} {organization.name}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataOverview title={t('total_visits_this_month')} total={totalMonthlyVisits.toString()}>
          <FontAwesomeIcon icon={faUser} width={22} />
        </CardDataOverview>
        <CardDataOverview title={t('total_visits_all_time')} total={totalAllVisits.toString()}>
          <FontAwesomeIcon icon={faClock} width={22} />
        </CardDataOverview>
        <CardDataOverview title={t('most_sold_medicines')} subtitle={topMed.name} total={topMedsSold[0]?.quantity.toString()}>
          <FontAwesomeIcon icon={faPills} width={22} />
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