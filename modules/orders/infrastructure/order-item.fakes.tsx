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
        name: "",
        description: "",
        price: 0,
        image: "",
    },
    {
        id: 2,
        medication: medications[1],
        treatment: null,
        name: "",
        description: "",
        price: 0,
        image: "",
    },
    {
        id: 3,
        medication: null,
        treatment: treatments[0],
        name: "",
        description: "",
        price: 0,
        image: "",
    }
]
