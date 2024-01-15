import { EDUCATION, RELIGION, MARRITAL_STATUS } from "@/modules/patients/domain/patient.constants"
import { Patient } from "@/modules/patients/domain/patient"

export const patientsFakeData: Patient[] = [
	{
		id: 1,
        name: "Maman Resing",
        height: 170,
        weight: 68.0,
        birthday: new Date('1994-12-25'),
        religion: RELIGION.islam,
        job: "Wirausaha",
        education: EDUCATION.associate,
        status: MARRITAL_STATUS.widow,
        gender: true,
        residentNumber: "320123456789",
        address: "Waterpark Karawaci No. 1, Tangerang",
        slug: "maman-resing",
	},
	{
		id: 2,
        name: "Iwan Sudrajat",
        height: 180,
        weight: 68.0,
        birthday: new Date('1968-11-25'),
        religion: RELIGION.islam,
        job: "Nelayan",
        education: EDUCATION.senior_secondary,
        status: MARRITAL_STATUS.married,
        gender: true,
        residentNumber: "320123456790",
        address: "Lippo Karawaci No. 10, Tangerang",
        slug: "iwan-sudrajat",
	},
]