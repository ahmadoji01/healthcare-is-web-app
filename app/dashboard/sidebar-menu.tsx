import React from "react";
import SidebarLinkGroup from "./sidebar-link-group";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SideMenuItem } from "@/config/dashboard/menu";
import { useTranslations } from "next-intl";

interface SidebarItemProps {
    sidebarExpanded: Boolean,
    setSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>,
    menu: SideMenuItem,
}

const SidebarMenu = ({ menu, sidebarExpanded, setSidebarExpanded }: SidebarItemProps) => {
    const pathname = usePathname();
    const t = useTranslations();

    return (
        <>
            { menu?.menuGroup.map((item, key) => (
                <div key={key}>
                    <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                        { t(item.headerTitle) }
                    </h3>

                    <ul className="mb-6 flex flex-col gap-1.5">
                        { item.menuItems.map((subitem, key) => (
                            <SidebarLinkGroup
                                key={key}
                                activeCondition={
                                    pathname === "/dashboard/" + subitem.url || pathname.includes(subitem.url)
                                }
                                >
                            {(handleClick, open) => {
                                return (
                                <React.Fragment>
                                    <Link
                                        href={"/dashboard/" + subitem.url}
                                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                            (pathname === "/dashboard/" + subitem.url ||
                                            pathname.includes(subitem.url)) &&
                                            "bg-graydark dark:bg-meta-4"
                                        }`}
                                        onClick={(e) => {
                                            if (subitem.subMenu.length > 0) {
                                                e.preventDefault();
                                                sidebarExpanded
                                                ? handleClick()
                                                : setSidebarExpanded(true);
                                            }
                                        }}
                                        >
                                        <FontAwesomeIcon icon={subitem.icon} width={18} height={18} />
                                            { t(subitem.title) }
                                        { subitem.subMenu.length >= 1 && (
                                            <svg
                                                className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                                open && "rotate-180"
                                                }`}
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                >
                                                <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                fill=""
                                                />
                                            </svg>
                                        )}
                                    </Link>
                                    { subitem.subMenu.length >= 1 && (
                                        <div
                                            className={`translate transform overflow-hidden ${
                                                !open && "hidden"
                                            }`}
                                            >
                                            <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                { subitem.subMenu.map((submenu, key) => (
                                                    <li key={key}>
                                                        <Link
                                                            href={"/dashboard/" + submenu.url}
                                                            className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                                            pathname === "/dashboard/" + submenu.url && "text-white"
                                                            } `}
                                                            >
                                                            { t(submenu.title) }
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </React.Fragment>
                                );
                            }}
                        </SidebarLinkGroup>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    )
}

export default SidebarMenu;