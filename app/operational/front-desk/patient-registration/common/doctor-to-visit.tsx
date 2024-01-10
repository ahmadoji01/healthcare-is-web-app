import Link from "next/link";
import { useEffect, useState } from "react";

interface Doctor {
    name: string,
}

interface DoctorToVisitProps {
    handleNext: () => void,
}

const DoctorToVisit = ({ handleNext }: DoctorToVisitProps) => {
    const [doctors, setDoctors] = useState<Doctor[]>();

    useEffect(() => {
        setDoctors([ 
            { name: "dr. Tika Panggabean" }, 
        ])
    }, []);

    return (
        <>
            {doctors?.map((doctor) => (
                <div className="flex justify-end mt-2">
                    <Link
                        href="#"
                        onClick={handleNext}
                        className="flex-1 grow items-center justify-center rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                        {doctor.name}
                    </Link>
                </div>
            ) )}
        </>
    );
}

export default DoctorToVisit;