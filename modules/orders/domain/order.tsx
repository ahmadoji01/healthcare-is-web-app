import { MedicalRecord } from "@/modules/medical-records/domain/medical-record";
import Medicine from "@/modules/medicines/domain/medicine";
import { Patient } from "@/modules/patients/domain/patient";
import { Treatment } from "@/modules/treatments/domain/treatment";

interface Order {
    id: number,
    patient: Patient,
    medicalRecord: MedicalRecord,
    medicines: [ {
        medicine: Medicine,
        quantity: number,
    } ],
    treatments: Treatment[],
    examinationFee: number,
    orderItems: OrderItem[],
    total: number,
}