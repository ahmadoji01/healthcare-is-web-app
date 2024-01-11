import { Patient } from "@/modules/patients/domain/patient";
import moment from "moment";
import { patientsFakeData } from "@/modules/patients/infrastructure/patients.fakes";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PageNav } from "@/components/Dashboard/PageNav/PageNav";
import { orderItemsFakeData } from "../../infrastructure/order-item.fakes";
import OrderItem, { orderItemCategory } from "../../domain/order-item";

interface OrderItemListProps {
  handleDeleteModal: any,
}

const OrderItemList = ({ handleDeleteModal }:OrderItemListProps) => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>();

  useEffect(() => {
    setOrderItems(orderItemsFakeData);
  })

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2 xl:p-4">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Item Name
            </h5>
          </div>
          <div className="hidden p-2 text-center sm:block xl:p-4">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Unit Price
            </h5>
          </div>
          <div className="hidden p-2 text-center sm:block xl:p-4">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Quantity
            </h5>
          </div>
          <div className="p-2 text-center xl:p-4">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Total
            </h5>
          </div>
          <div className="p-1 text-center xl:p-2">
            
          </div>
        </div>

        {typeof(orderItems) !== "undefined" && orderItems.map((item, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === orderItems.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center justify p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{orderItemCategory(item)}: {item.name}</p>
            </div>

            <div className="hidden items-center justify-center sm:flex p-2.5 xl:p-5">
              <p className="text-meta-3">{item.price}</p>
            </div>

            <div className="hidden items-center justify-center sm:flex p-2.5 xl:p-5">
              <p className="text-center text-black dark:text-white">{item.quantity}</p>
            </div>

            <div className="hidden items-center justify-center sm:flex p-2.5 xl:p-5">
              <p className="text-center text-black dark:text-white">{item.total * item.quantity}</p>
            </div>

            <div className="items-center justify-center p-2.5 sm:flex xl:p-5">
              <ul className="flex items-center gap-2 2xsm:gap-4">
                <motion.li className="relative" whileHover={{ scale: 1.2, transition: { duration: 0.2 }}} whileTap={{ scale:0.9 }} >  
                  <Link
                    href="#"
                    onClick={handleDeleteModal}
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
          <PageNav count={10} />
        </div>
      </div>
    </div>
  );
};

export default OrderItemList;