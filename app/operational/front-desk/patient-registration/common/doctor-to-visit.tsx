import { useDoctorContext } from "@/contexts/doctor-context";
import { useFrontDeskContext } from "@/contexts/front-desk-context";
import { DoctorName } from "@/utils/doctor-name-format";
import Link from "next/link";

interface DoctorToVisitProps {
    handleNext: () => void,
}

const DoctorToVisit = ({ handleNext }: DoctorToVisitProps) => {
    const {presentDoctors, setActiveDoctor} = useFrontDeskContext();

    return (
        <>
            {presentDoctors?.map((doctor) => (
                <div className="flex justify-end mt-2">
                    <Link
                        href="#"
                        onClick={() => { handleNext(); setActiveDoctor(doctor); }}
                        className="flex-1 grow items-center justify-center rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                        {DoctorName(doctor.name, doctor.specialization)}
                    </Link>
                </div>
            ) )}
        </>
    );
}

export default DoctorToVisit;