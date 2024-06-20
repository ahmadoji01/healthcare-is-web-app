import { Patient } from "@/modules/patients/domain/patient";
import moment from "moment";
import { patientsFakeData } from "@/modules/patients/infrastructure/patients.fakes";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { PageNav } from "@/components/Dashboard/PageNav/PageNav";
import { Item, defaultItem } from "../../domain/item";
import Currency from "@/components/Currency";

interface ItemListTableProps {
  handleModal: (closeModal:boolean, whichModal:boolean) => void,
  items: Item[],
  totalPages: number,
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void,
  setActiveItem: Dispatch<SetStateAction<Item>>,
  handleQtyChange: (action:string, item:Item, index:number, qty:number) => void,
  showStock?: boolean,
}

const ItemListTable = ({ handleModal, showStock=true, items, totalPages, handlePageChange, setActiveItem, handleQtyChange }: ItemListTableProps) => {

  const handleChange = (action:string, item:Item, index:number, qty:number) => {
    handleQtyChange(action, item, index, qty);
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Category
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Price
            </h5>
          </div>
          { showStock &&
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Stock
              </h5>
            </div>
          }
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>

        {typeof(items) !== "undefined" && items.map((item, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === items.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center justify p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{item.name}</p>
            </div>

            <div className="hidden items-center justify p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{item.category?.name}</p>
            </div>

            <div className="hidden items-center justify-center sm:flex p-2.5 xl:p-5">
              <p className="text-meta-3">{<Currency value={item.price} />}</p>
            </div>

            { showStock && 
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <div className="custom-number-input h-10">
                  <div className="flex flex-row h-10 w-full rounded-lg mt-1">
                    <input 
                      defaultValue={item.stock}
                      type="number" 
                      className="quantity-input text-center w-10 font-semibold bg-transparent" 
                      name="custom-input-number"
                      min={0}
                      onBlur={e => handleChange('input', item, key, parseInt(e.target.value)) } />
                  </div>
                </div>
              </div>
            }

            <div className="items-center justify-center p-2.5 sm:flex xl:p-5">
            <ul className="flex items-center gap-2 2xsm:gap-4">
                <motion.li className="relative" whileHover={{ scale: 1.2, transition: { duration: 0.2 }}} whileTap={{ scale:0.9 }} >  
                  <Link
                    href="#"
                    onClick={() => { handleModal(false, true); setActiveItem(item) }}
                    className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                    >
                    <FontAwesomeIcon width={18} height={18} icon={faPencil} />
                  </Link>
                </motion.li>
                <motion.li className="relative" whileHover={{ scale: 1.2, transition: { duration: 0.2 }}} whileTap={{ scale:0.9 }} >  
                  <Link
                    href="#"
                    onClick={() => { handleModal(false, false); setActiveItem(item) }}
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
          <Pagination count={totalPages} onChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};

export default ItemListTable;
