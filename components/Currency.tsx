import CURRENCY_FORMAT from "@/config/currency-format";

interface CurrencyProps {
    value: number;
}

const Currency = ({ value }:CurrencyProps) => {

    const currFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: CURRENCY_FORMAT });

    return (
        <>
            { currFormat.format(value) }
        </>
    )

}

export default Currency;