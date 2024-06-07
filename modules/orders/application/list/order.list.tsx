import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PageNav } from "@/components/Dashboard/PageNav/PageNav";
import { Order } from "../../domain/order";
import Currency from "@/components/Currency";
import moment from "moment";

interface OrderListTableProps {
  handleModal: (closeModal:boolean, whichModal:boolean) => void,
  orders: Order[],
  totalPages: number,
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void,
  setActiveOrder: Dispatch<SetStateAction<Order|undefined>>
}

const OrderListTable = ({ orders, setActiveOrder, totalPages, handlePageChange, handleModal }: OrderListTableProps) => {
  
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Date
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm text-center font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Order Items
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Total
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>

        {typeof(orders) !== "undefined" && orders.map((order, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === orders.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >

            <div className="hidden items-center justify-center sm:flex p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{ moment(order.date_updated).format("MMMM Do YYYY") }</p>
            </div>

            <div className="flex items-center justify p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{order.patient?.name}</p>
            </div>

            <div className="hidden items-center justify p-2.5 sm:flex xl:p-5">
              <ul>
                { order.order_items?.map( (item) => 
                    <li>
                        { item.treatment != null && <p className="text-black dark:text-white">{ item.treatment?.name }</p> }
                        { item.medicine != null && <p className="text-black dark:text-white">{ item.medicine?.name }</p> }
                        { item.name != "" && <p className="text-black dark:text-white">{ item.name }</p> }
                    </li>
                )}
              </ul>
            </div>

            <div className="hidden items-center justify p-2.5 sm:flex xl:p-5">
                <p className="text-meta-3 dark:text-white">{<Currency value={order.total} />}</p>
            </div>

            <div className="items-center justify-center p-2.5 sm:flex xl:p-5">
              <ul className="flex items-center gap-2 2xsm:gap-4">
                <motion.li className="relative" whileHover={{ scale: 1.2, transition: { duration: 0.2 }}} whileTap={{ scale:0.9 }} >  
                  <Link
                    href="#"
                    onClick={() => { handleModal(false, true); setActiveOrder(order) }}
                    className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                    >
                    <FontAwesomeIcon width={18} height={18} icon={faPencil} />
                  </Link>
                </motion.li>
                <motion.li className="relative" whileHover={{ scale: 1.2, transition: { duration: 0.2 }}} whileTap={{ scale:0.9 }} >  
                  <Link
                    href="#"
                    onClick={() => { handleModal(false, false); setActiveOrder(order) }}
                    style={{ background: "red" }}
                    className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                    >
                    <FontAwesomeIcon width={18} height={18} icon={faTrash} style={{ color: 'white' }} />
                  </Link>
                </motion.li>
              </ul>
            </div>
          </div>
        ))}
        <div className="py-3">
          <PageNav count={totalPages} />
        </div>
      </div>
    </div>
  );
};

export default OrderListTable;
