import { faHeart, faMapPin, faSearch, faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import DarkModeSwitcher from "../Header/DarkModeSwitcher";
import DropdownNotification from "../Header/DropdownNotification";
import DropdownMessage from "../Header/DropdownMessage";
import DropdownUser from "../Header/DropdownUser";

const Footer = () => {

    return (
        <footer className="sticky bottom-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
            <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                <div className="hidden sm:block">
                <form action="https://formbold.com/s/unique_form_id" method="POST">
                    <div className="relative">
                    <button className="absolute left-0 top-1/2 -translate-y-1/2">
                        <FontAwesomeIcon width={20} icon={faSearch} />
                    </button>
                    <input
                        type="text"
                        placeholder="Search items..."
                        className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
                    />
                    </div>
                </form>
                </div>

                <div className="flex items-center gap-3 2xsm:gap-7">
                <ul className="flex items-center gap-2 2xsm:gap-4">
                    {/* <!-- Dark Mode Toggler --> */}
                    <DarkModeSwitcher />
                    {/* <!-- Dark Mode Toggler --> */}

                    {/* <!-- Notification Menu Area --> */}
                    <DropdownNotification />
                    {/* <!-- Notification Menu Area --> */}

                    {/* <!-- Chat Notification Area --> */}
                    <DropdownMessage />
                    {/* <!-- Chat Notification Area --> */}
                </ul>

                {/* <!-- User Area --> */}
                <DropdownUser />
                {/* <!-- User Area --> */}
                </div>
            </div>
        </footer>
    )

}

export default Footer;