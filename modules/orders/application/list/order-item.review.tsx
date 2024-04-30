import { useEffect, useState } from "react";
import { orderItemsFakeData } from "../../infrastructure/order-item.fakes";
import OrderItem, { orderItemCategory, orderItemName } from "../../domain/order-item";
import Currency from "@/components/Currency";

interface OrderItemReviewProps {
  orderItems: OrderItem[]|undefined,
  total: number,
}

const OrderItemReview = ({ orderItems, total = 0 }:OrderItemReviewProps) => {
  
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
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
        </div>

        {typeof(orderItems) !== "undefined" && orderItems.map((item, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-4 ${
              key === orderItems.length - 1
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
              <p className="text-meta-3">{item.quantity}</p>
            </div>
            <div className="hidden items-center justify-center sm:flex p-2.5 xl:p-5">
              <p className="text-center text-black dark:text-white"><Currency value={item.price * item.quantity} /></p>
            </div>
          </div>
        ))}
        <h4 className="font-extrabold text-2xl text-black dark:text-white mb-4">Total: <Currency value={total} /></h4>
      </div>
    </div>
  );
};

export default OrderItemReview;