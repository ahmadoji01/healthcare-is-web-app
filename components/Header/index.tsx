import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import { Chip } from "@mui/material";
import { useUserContext } from "@/contexts/user-context";
import { ORG_STATUS } from "@/modules/organizations/domain/organizations.constants";
import { useTranslation } from "react-i18next";
import TextSizeIcon from "../Icons/TextSizeIcon";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

let activeTimeout = null;

interface HeaderProps {
  sidebarOpen: string | boolean | undefined,
  setSidebarOpen: (arg0: boolean) => void,
}

const Header = ({ sidebarOpen, setSidebarOpen }:HeaderProps) => {

  const {organization} = useUserContext();
  const [fontSize, setFontSize] = useState("100%"); 
  const t = useTranslations();

  useEffect(() => {
    let localSize = localStorage.getItem("font-size");
    if (localSize !== null) {
      setFontSize(localSize);
    }
  }, [])

  useEffect(() => {
    document.body.style.fontSize = fontSize;
  }, [fontSize])

  const handleStatusChip = () => {
    if (organization.status === ORG_STATUS.open) {
      return <Link href="/operational/front-desk"><Chip label={ t('open') } color="primary" /></Link>
    }
    if (organization.status === ORG_STATUS.close) {
      return <Link href="/operational/front-desk"><Chip label={ t('close') } color="error" /></Link>
    }
    return <Link href="/operational/front-desk"><Chip label={ t('loading') } color="warning" /></Link>
  }

  const handleFontSizeChange = (size:string) => {
    localStorage.setItem("font-size", size);
    setFontSize(size);
  }
  
  return (
    <header className={`sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none`}>
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && "!h-0 !delay-[0]"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && "!h-0 !delay-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>

          <Link className="block flex-shrink-0 lg:hidden" href="/">
            <Image
              width={32}
              height={32}
              src={"/images/logo/logo-icon.svg"}
              alt="Logo"
            />
          </Link>
        </div>

        <div className="hidden sm:block">
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="relative">
              <p className="text-black inline-block align-middle dark:text-white mr-3">{ t('front_desk.clinic_status_title') }</p>
              { handleStatusChip() }
            </div>
          </form>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DarkModeSwitcher />
            <TextSizeIcon size="15px" onClick={() => handleFontSizeChange("100%")} />
            <TextSizeIcon size="20px" onClick={() => handleFontSizeChange("120%")} />
            <TextSizeIcon size="25px" onClick={() => handleFontSizeChange("140%")} />
          </ul>
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
