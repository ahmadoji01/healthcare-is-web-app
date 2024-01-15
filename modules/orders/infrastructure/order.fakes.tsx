import { patientsFakeData } from "@/modules/patients/infrastructure/patients.fakes";
import { Order } from "../domain/order";
import { orderItemsFakeData } from "./order-item.fakes";
import { ORDER_STATUS } from "../domain/order.constants";
import { medicalRecordFakeData } from "@/modules/medical-records/infrastructure/medical-records.fakes";

const orderItems = orderItemsFakeData;
const patients = patientsFakeData;
const medicalRecords = medicalRecordFakeData;

export const ordersFakeData: Order[] = [
    {
        id: 1,
        patient: patients[0],
        medicalRecord: medicalRecords[0],
        queueNumber: "A001",
        examinationFee: 50000,
        orderItems: orderItems,
        total: 0,
        status: ORDER_STATUS.waiting_payment,
    }
]