import { EDUCATION, RELIGION, JOB_STATUS, GENDER } from "@/modules/doctors/domain/doctor.constants"
import { Doctor } from "@/modules/doctors/domain/doctor"

export const doctorsFakeData: Doctor[] = [
	{
		id: 1,
        name: "Iyep Bustomi",
        birthday: new Date('1961-12-25'),
        religion: RELIGION.islam,
        specialization: "Sp.A",
        jobStatus: JOB_STATUS.full_time,
        gender: GENDER.male,
        residentNumber: "320123456789",
        address: "Waterpark Karawaci No. 1, Tangerang",
        slug: "maman-resing",
	},
	{
		id: 2,
        name: "Acep Endang",
        birthday: new Date('1968-11-25'),
        religion: RELIGION.islam,
        specialization: "Sp.KK",
        jobStatus: JOB_STATUS.part_time,
        gender: GENDER.male,
        residentNumber: "320123456790",
        address: "Lippo Karawaci No. 10, Tangerang",
        slug: "iwan-sudrajat",
	},
]