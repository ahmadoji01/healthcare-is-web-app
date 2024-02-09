import { HeadToToeCheckup, defaultHeadToToeCheckup } from "./head-to-toe-checkup";
import { PastMedicalConcern, defaultPastMedicalConcern } from "./past-medical-concern";

export interface PhysicalCheckup {
    id: number,
    past_medical_concern: PastMedicalConcern,
    head_to_toe_checkup: HeadToToeCheckup,
    height: number,
    weight: number,
    tension: string,
    temperature: number,
    breath_rate: number,
    heart_rate: number,
    complaint: string,
}

export const defaultPhysicalCheckup: PhysicalCheckup = {
    id: 0,
    past_medical_concern: defaultPastMedicalConcern,
    head_to_toe_checkup: defaultHeadToToeCheckup,
    height: 0,
    weight: 0,
    tension: "",
    temperature: 0,
    breath_rate: 0,
    heart_rate: 0,
    complaint: "",
}