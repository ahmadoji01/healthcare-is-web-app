import Medication from "@/modules/medical-records/domain/medication";

interface MedicationListProps {
    medications: Medication[],
}

const MedicationList = ({ medications }:MedicationListProps) => {

    return (
        <>
            { medications?.map( (medication) => 
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            { medication.medicine.name }
                        </h3>
                    </div>
                </div>
            ) }
        </>
    )
}

export default MedicationList;