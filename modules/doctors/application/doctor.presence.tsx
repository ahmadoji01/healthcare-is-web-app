import { ChangeEvent, useState } from "react";
import { Button, Checkbox } from "@mui/material";
import { DoctorOrganization } from "../domain/doctor";
import { DoctorName } from "@/modules/doctors/domain/doctor.specifications";

interface DoctorListTableProps {
  doctorOrgs: DoctorOrganization[],
  handleSubmit: (selectedDoctorOrgIds:number[]) => void
}

const DoctorPresence = ({ doctorOrgs, handleSubmit }: DoctorListTableProps) => {
  
    const [selectedDoctorOrgIds, setSelectedDoctorOrgIds] = useState<number[]>([]);

    const handleChecked = (e:ChangeEvent<HTMLInputElement>, index:number) => {
        let checked = e.target.checked;
        let selectedIds = selectedDoctorOrgIds;

        if (checked) {
            selectedIds.push(index);
        } else {
            selectedIds.splice(selectedIds.indexOf(index), 1);
        }
        setSelectedDoctorOrgIds(selectedIds);
    }

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex flex-col">
                <div className="grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-2">
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Selected
                        </h5>
                    </div>
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Doctor
                        </h5>
                    </div>
                </div>

                {typeof(doctorOrgs) !== "undefined" && doctorOrgs.map((doctorOrg, key) => (
                <div
                    className={`grid grid-cols-2 sm:grid-cols-2 ${
                    key === doctorOrgs.length - 1
                        ? ""
                        : "border-b border-stroke dark:border-strokedark"
                    }`}
                    key={key}
                    >
                    <div className="flex items-center justify p-2.5 xl:p-5">
                        <Checkbox onChange={ e => handleChecked(e, doctorOrg.id)} />
                    </div>

                    <div className="flex items-center justify p-2.5 xl:p-5">
                        <p className="text-black dark:text-white">{DoctorName(doctorOrg.doctor.name, doctorOrg.doctor.specialization)}</p>
                    </div>
                </div>
                ))}
            </div>
            <Button
                onClick={() => handleSubmit(selectedDoctorOrgIds)}
                className="inline-block align-middle w-full bg-meta-3 py-4 px-10 text-center text-white lg:px-8 xl:px-10">
                <p className="text-3xl text-bold">Open Clinic</p>
            </Button>
        </div>
    );
};

export default DoctorPresence;
