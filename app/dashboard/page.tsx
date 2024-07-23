'use client';

import CardMenu from "@/components/Dashboard/CardMenu";
import { HomeMenuItem, homeMenuItems } from "@/config/dashboard/menu";
import { useUserContext } from "@/contexts/user-context";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const DashboardHome = () => {

  const t = useTranslations();
  const {user, organization} = useUserContext();
  const [homeMenuItem, setHomeMenuItem] = useState<HomeMenuItem>();

  useEffect(() => {
    if (user.id === '')
      return;

    let index = homeMenuItems.findIndex( item => item.role === user.role_name );
    setHomeMenuItem(homeMenuItems[index]);
  }, [user])

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Hi, {user.first_name}. {t('dashboard_welcome')} {organization.name}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        { homeMenuItem?.homeMenus.map( (item, key) => (
          <Link href={item.url} key={key}>
            <CardMenu title={t(item.title)}>
              <Image
                src={item.image}
                alt="Logo"
                width={64}
                height={64}
                />
            </CardMenu>
          </Link>
        ))}
      </div>
    </>
  );
}

export default DashboardHome;