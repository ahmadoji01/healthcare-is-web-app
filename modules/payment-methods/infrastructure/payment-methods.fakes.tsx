import { PaymentMethod } from "../domain/payment-method";
import CashIcon from "@/public/icons/cash.svg";
import PayPalIcon from "@/public/icons/paypal.svg";
import TransferIcon from "@/public/icons/transfer.svg";

export const paymentMethodsFakeData: PaymentMethod[] = [
	{
		id: 1,
        name: "Cash",
        description: "",
        enabled: true,
	},
    {
		id: 2,
        name: "Credit/Debit Card",
        description: "",
        enabled: true,
	},
    {
		id: 3,
        name: "Bank Transfer",
        description: "",
        enabled: true,
	},
    {
		id: 4,
        name: "QR Payment",
        description: "",
        enabled: true,
	},
    {
		id: 5,
        name: "Virtual Account",
        description: "",
        enabled: true,
	},
]