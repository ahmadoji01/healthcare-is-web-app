import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useOrderSummaryModalContext } from "@/contexts/order-summary-modal-context";

const Footer = () => {

    const { handleModal } = useOrderSummaryModalContext();

    return (
        <footer className="sticky bottom-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
            <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                <div className="block text-black dark:text-white font-extrabold text-xl">
                    Total: Rp. 180000
                </div>

                <div className="flex items-center gap-3 2xsm:gap-7">
                    <Link
                        href="#"
                        onClick={ () => handleModal(false,false,true) }
                        className="inline-flex items-center justify-center gap-2.5 rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                        >
                        <span>
                            <FontAwesomeIcon icon={faCartShopping} />
                        </span>
                        Checkout
                    </Link>
                </div>
            </div>
        </footer>
    )

}

export default Footer;