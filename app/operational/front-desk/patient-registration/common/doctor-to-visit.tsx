import { useDoctorContext } from "@/contexts/doctor-context";
import Link from "next/link";

interface DoctorToVisitProps {
    handleNext: () => void,
}

const DoctorToVisit = ({ handleNext }: DoctorToVisitProps) => {
    const {doctors, setActiveDoctor} = useDoctorContext();

    return (
        <>
            {doctors?.map((doctor) => (
                <div className="flex justify-end mt-2">
                    <Link
                        href="#"
                        onClick={() => { handleNext(); setActiveDoctor(doctor); }}
                        className="flex-1 grow items-center justify-center rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                        {doctor.name}
                    </Link>
                </div>
            ) )}
        </>
    );
}

export default DoctorToVisit;