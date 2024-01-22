import Currency from "@/components/Currency";
import { useOrderSummaryContext } from "@/contexts/order-summary-context";
import Medicine from "@/modules/medicines/domain/medicine";
import { Treatment } from "@/modules/treatments/domain/treatment";
import { faAdd, faPills } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react"

interface ItemCardProps {
    showQtyHandler: boolean,
    item: Medicine|Treatment,
    handleAddItem: (item:any, quantity:number) => void,
}

const ItemCard = ({ item, showQtyHandler, handleAddItem }:ItemCardProps) => {

    const [quantity, setQuantity] = useState<number>(1);
    const [hidden, setHidden] = useState<boolean>(false);
    const { selectedOrder } = useOrderSummaryContext();

    useEffect( () => {
        isInOrderItems(item);
    })

    const handleChange = (action:string) => {
        if (action === 'add') {
            setQuantity(quantity + 1);
            return;
        }
        if (action === 'substract') {
            setQuantity(quantity - 1);
            return;
        }
    }

    const isInOrderItems = (item:Medicine|Treatment) => {
        if (selectedOrder?.orderItems.some(val => val.medication?.medicine.id === item.id)) {
            setHidden(true);
        }
    }

    return (
        <div className={`${ hidden && 'hidden' } flex rounded-sm border border-stroke p-4 mb-1 bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}>
            <div className="grid grid-cols-3 sm:grid-cols-4">
                <div className={`my-auto ml-6 'text-black dark:text-white font-bold'`}>
                    { item.name }
                </div>
                <div className={`my-auto ml-2 text-black dark:text-white font-bold text-center`}>
                    <Currency value={item.price} />
                </div>
                <div className="custom-number-input m-auto">
                    { showQtyHandler &&
                        <div className="flex flex-row w-full rounded-lg mt-1">
                            <button className="h-full w-20 rounded-l cursor-pointer outline-none">
                                <span className="m-auto text-2xl font-thin" onClick={() => handleChange('substract')}>−</span>
                            </button>
                            <input 
                                value={quantity}
                                type="number" 
                                className="quantity-input text-center w-15 font-semibold bg-transparent" 
                                name="custom-input-number" />
                            <button data-action="increment" className="h-full w-20">
                                <span className="m-auto text-2xl font-thin" onClick={() => handleChange('add')}>+</span>
                            </button>
                        </div>
                    }
                </div>
                <div className="m-auto">
                    <button onClick={() => handleAddItem(item, quantity)} className="inline-flex items-center justify-center w-8 h-8 mr-2 text-pink-100 transition-colors duration-150 bg-primary rounded-full focus:shadow-outline">
                        <FontAwesomeIcon icon={faAdd} color="white" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ItemCard;