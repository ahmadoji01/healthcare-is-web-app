import { Patient } from "@/modules/patients/domain/patient"
import { PatientsOutput } from "@/modules/patients/domain/patients.output"

export const getPatients = async ({
	patientsOutput,
}: {
	patientsOutput: PatientsOutput
}): Promise<Patient[]> => {
	try {
		return await patientsOutput.getPatients()
	} catch (error: any) {
		throw new Error(error)
	}
}

export const addPatient = async ({
	patientsOutput,
	patientId,
}: {
	patientsOutput: PatientsOutput
	patientId: string
}): Promise<Patient[]> => {
	try {
		return await patientsOutput.addPatient({ patientId })
	} catch (error: any) {
		throw new Error(error)
	}
}

export const updatePatient = async ({
	patientsOutput,
	patientId,
}: {
	patientsOutput: PatientsOutput
	patientId: string
}): Promise<Patient[]> => {
	try {
		return await patientsOutput.updatePatient({ patientId })
	} catch (error: any) {
		throw new Error(error)
	}
}

export const removePatient = async ({
	patientsOutput,
	patientId,
}: {
	patientsOutput: PatientsOutput
	patientId: string
}): Promise<Patient[]> => {
	try {
		return await patientsOutput.removePatient({ patientId })
	} catch (error: any) {
		throw new Error(error)
	}
}