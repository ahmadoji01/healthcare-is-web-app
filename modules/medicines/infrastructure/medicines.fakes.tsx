import Medicine from "@/modules/medicines/domain/medicine"

export const medicinesFakeData: Medicine[] = [
	{
        id: 1,
        code: "med-001",
        name: "Test 1",
        stock: 10,
        category: { id: 0, name: "" },
        price: 10000,
    },
    {
        id: 2,
        code: "med-002",
        name: "Test 2",
        stock: 10,
        category: { id: 0, name: "" },
        price: 20000,
    },
    {
        id: 3,
        code: "med-003",
        name: "Test 3",
        stock: 10,
        category: { id: 0, name: "" },
        price: 30000,
    }
]