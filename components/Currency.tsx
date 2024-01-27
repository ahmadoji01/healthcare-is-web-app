import appConfig from "@/config";

interface CurrencyProps {
    value: number;
}

const Currency = ({ value }:CurrencyProps) => {

    const currFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: appConfig.CURRENCY_FORMAT });

    return (
        <>
            { currFormat.format(value) }
        </>
    )

}

export default Currency;