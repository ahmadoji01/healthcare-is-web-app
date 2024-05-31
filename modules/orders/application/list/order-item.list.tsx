import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { OrderItem, orderItemCategory, orderItemName } from "../../domain/order-item";
import Currency from "@/components/Currency";
import { useEffect, useState } from "react";

interface OrderItemListProps {
  orderItems: OrderItem[]|undefined,
  handleQtyChange: (action:string, itemIndex:number, qty:number) => void,
  handleDelete: (item:OrderItem, index:number) => void,
}

const OrderItemList = ({ orderItems, handleDelete, handleQtyChange }:OrderItemListProps) => {

  const [items, setItems] = useState<OrderItem[]|undefined>(orderItems);

  useEffect( () => {
    setItems(orderItems);
  }, [items]);

  const handleChange = (action:string, itemIndex:number, qty:number) => {
    handleQtyChange(action, itemIndex, qty);
  }

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
              <p className="text-black dark:text-white">{orderItemCategory(item)}: {orderItemName(item)}</p>
            </div>
            <div className="hidden items-center justify-center sm:flex p-2.5 xl:p-5">
              <p className="text-meta-3"><Currency value={item.price} /></p>
            </div>
            
            <div className="hidden items-center justify-center sm:flex p-2.5 xl:p-5">
              { item.treatment === null && 
                <div className="custom-number-input h-10">
                  <div className="flex flex-row h-10 w-full rounded-lg mt-1">
                    <button className="h-full w-10 rounded-l cursor-pointer outline-none">
                      <span className="m-auto text-2xl font-thin" onClick={() => handleChange('substract', key, 0)}>−</span>
                    </button>
                    <input 
                      value={item.quantity}
                      type="number" 
                      className="quantity-input text-center w-10 font-semibold bg-transparent" 
                      name="custom-input-number" />
                    <button data-action="increment" className="h-full w-10">
                      <span className="m-auto text-2xl font-thin" onClick={() => handleChange('add', key, 0)}>+</span>
                    </button>
                  </div>
                </div>
              }
            </div>

            <div className="hidden items-center justify-center sm:flex p-2.5 xl:p-5">
              <p className="text-center text-black dark:text-white"><Currency value={item.price * item.quantity} /></p>
            </div>

            <div className="items-center justify-center p-2.5 sm:flex xl:p-5">
              <ul className="flex items-center gap-2 2xsm:gap-4">
                <motion.li className="relative" whileHover={{ scale: 1.2, transition: { duration: 0.2 }}} whileTap={{ scale:0.9 }} >  
                  <Link
                    href="#"
                    onClick={ () => handleDelete(item, key)}
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
      </div>
    </div>
  );
};

export default OrderItemList;