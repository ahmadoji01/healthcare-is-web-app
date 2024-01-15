import CardPayment from "./payment.card"
import CashPayment from "./payment.cash"

interface PaymentProviderProps {
    name: string,
    total: number,
    handleChange: () => void,
}

const PaymentProvider = ({ name, total = 0, handleChange }:PaymentProviderProps) => {

    switch (name) {
        case 'cash':
            return <CashPayment total={total} handleChange={handleChange} />
        case 'card':
            return <CardPayment total={total} />
        default:
            return <CashPayment total={total} handleChange={handleChange} />
    }

}

export default PaymentProvider;