import Currency from "@/components/Currency";
import { faAdd, faPills } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react"

interface ItemCardProps {
    name: string,
    price: number,
}

const ItemCard = ({ name, price }:ItemCardProps) => {

    const [selected, setSelected] = useState<boolean>(false);

    return (
        <div className={`flex rounded-lg border px-2 py-4 bg-white dark:border-strokedark dark:bg-boxdark`}>
            <div className="grid grid-cols-3 sm:grid-cols-4">
                <div className={`my-auto ml-6 'text-black dark:text-white font-bold'`}>
                    { name } using the long word to see how the system cope with long text
                </div>
                <div className={`my-auto ml-2 text-black dark:text-white font-bold text-center`}>
                    <Currency value={price} />
                </div>
                <div className="custom-number-input m-auto">
                    <div className="flex flex-row w-full rounded-lg mt-1">
                    <button className="h-full w-20 rounded-l cursor-pointer outline-none">
                        <span className="m-auto text-2xl font-thin">−</span>
                    </button>
                    <input 
                        defaultValue={1}
                        type="number" 
                        className="quantity-input text-center w-15 font-semibold bg-transparent" 
                        name="custom-input-number" />
                    <button data-action="increment" className="h-full w-20">
                        <span className="m-auto text-2xl font-thin">+</span>
                    </button>
                    </div>
                </div>
                <div className="m-auto">
                    <button className="inline-flex items-center justify-center w-8 h-8 mr-2 text-pink-100 transition-colors duration-150 bg-primary rounded-full focus:shadow-outline">
                        <FontAwesomeIcon icon={faAdd} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ItemCard;