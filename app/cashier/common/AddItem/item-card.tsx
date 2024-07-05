import Currency from "@/components/Currency";
import { useOrderSummaryContext } from "@/contexts/order-summary-context";
import { Item } from "@/modules/items/domain/item";
import { ITEM_TYPE } from "@/modules/items/domain/item.constants";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react"

interface ItemCardProps {
    item: Item,
    handleAddItem: (item:any, quantity:number) => void,
}

const ItemCard = ({ item, handleAddItem }:ItemCardProps) => {

    const [quantity, setQuantity] = useState<number>(1);
    const [hidden, setHidden] = useState<boolean>(false);
    const { selectedOrder } = useOrderSummaryContext();
    const t = useTranslations();

    useEffect( () => {
        isInOrderItems(item);
    }, [selectedOrder]);

    const handleChange = (value:number, action:string) => {
        if (action === 'add') {
            setQuantity(quantity + 1);
            return;
        }
        if (action === 'substract') {
            setQuantity(quantity - 1);
            return;
        }
        if (action === 'input') {
            setQuantity(value);
            return;
        }
    }

    const isInOrderItems = (item:Item) => {
        if (selectedOrder?.order_items.some(val => val.item?.id === item.id)) {
            setHidden(true);
        }
        return;
    }

    return (
        <div className={`flex rounded-sm border border-stroke p-4 mb-1 bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}>
            <div className="grid grid-cols-8 gap-4 w-full">
                <div className={`col-span-2 my-auto 'text-black dark:text-white font-bold'`}>
                    { item.name } { item.type !== ITEM_TYPE.treatment && " (" + item.stock.toString() + ")" }
                </div>
                <div className={`col-span-2 my-auto text-black dark:text-white font-bold`}>
                    <Currency value={item.price} />
                </div>
                <div className="custom-number-input m-auto col-span-3">
                    { (item.type !== ITEM_TYPE.treatment && !hidden) &&
                        <div className="flex flex-row w-full rounded-lg mt-1">
                            <button className="h-full w-15 rounded-l cursor-pointer outline-none">
                                <span className="m-auto text-2xl font-thin" onClick={() => handleChange(0, 'substract')}>−</span>
                            </button>
                            <input 
                                value={quantity}
                                type="number" 
                                className="quantity-input text-center w-10 font-semibold bg-transparent"
                                onChange={ e => handleChange(parseInt(e.target.value), 'input')}
                                name="custom-input-number" />
                            <button data-action="increment" className="h-full w-15">
                                <span className="m-auto text-2xl font-thin" onClick={() => handleChange(0, 'add')}>+</span>
                            </button>
                        </div>
                    }
                    { hidden && <h4>{ t("cashier.item_already_added") }</h4> }
                </div>
                <div className="m-auto col-span-1">
                    { !hidden && 
                        <button onClick={() => handleAddItem(item, quantity)} className="inline-flex items-center justify-center w-8 h-8 mr-2 text-pink-100 transition-colors duration-150 bg-primary rounded-full focus:shadow-outline">
                            <FontAwesomeIcon icon={faAdd} color="white" />
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default ItemCard;