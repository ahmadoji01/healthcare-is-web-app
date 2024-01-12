import { medicationsFakeData } from "@/modules/medical-records/infrastructure/medication.fakes";
import OrderItem from "../domain/order-item";
import { treatmentsFakeData } from "@/modules/treatments/infrastructure/treatments.fakes";

const medications = medicationsFakeData;
const treatments = treatmentsFakeData;

export const orderItemsFakeData: OrderItem[] = [
    {
        id: 1,
        medication: medications[0],
        treatment: null,
        name: medications[0].medicine.name,
        description: "",
        price: medications[0].medicine.price,
        quantity: medications[0].quantity,
        total: medications[0].medicine.price * medications[0].quantity,
        image: "",
    },
    {
        id: 2,
        medication: medications[1],
        treatment: null,
        name: medications[1].medicine.name,
        description: "",
        price: medications[1].medicine.price,
        quantity: medications[1].quantity,
        total: medications[1].medicine.price * medications[1].quantity,
        image: "",
    },
    {
        id: 3,
        medication: null,
        treatment: treatments[0],
        name: treatments[0].name,
        description: "",
        price: treatments[0].price,
        quantity: 1,
        total: treatments[0].price,
        image: "",
    }
]
