import Medication from "../domain/medication";

export const medicationsFakeData: Medication[] = [
    {
        medicine: {
            id: 1,
            code: "med-001",
            name: "Test 1",
            stock: 10,
            category: { id: 0, name: "" },
            price: 10000,
        },
        doses: "2 times per day",
        quantity: 2,
    },
    {
        medicine: {
            id: 2,
            code: "med-002",
            name: "Test 2",
            stock: 10,
            category: { id: 0, name: "" },
            price: 20000,
        },
        doses: "1 time per day",
        quantity: 2,
    }
]