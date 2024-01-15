import { MedicalRecord } from "@/modules/medical-records/domain/medical-record";
import Medicine from "@/modules/medicines/domain/medicine";
import { Patient } from "@/modules/patients/domain/patient";
import { Treatment } from "@/modules/treatments/domain/treatment";
import OrderItem from "./order-item";

export interface Order {
    id: number,
    patient: Patient,
    queueNumber: string,
    medicalRecord: MedicalRecord,
    examinationFee: number,
    orderItems: OrderItem[],
    total: number,
    status: string,
}