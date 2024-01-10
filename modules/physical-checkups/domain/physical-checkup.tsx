import { HeadToToeCheckup } from "./head-to-toe-checkup";
import { PastMedicalConcern } from "./past-medical-concern";

export interface PhysicalCheckup {
    id: number,
    pastMedicalConcern: PastMedicalConcern,
    headToToeCheckup: HeadToToeCheckup,
    height: number,
    weight: number,
    tension: string,
    temperature: number,
    breathRate: number,
    heartRate: number,
}