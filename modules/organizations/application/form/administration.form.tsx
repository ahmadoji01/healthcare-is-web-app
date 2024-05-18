import SubmitButton from "@/components/Dashboard/Submit";
import { Organization } from "../../domain/organization";
import { useState } from "react";

interface AdministrationFormProps {
    initOrg: Organization,
    handleSubmit: (org:Organization) => void,
}

const AdministrationForm = ({ initOrg, handleSubmit }: AdministrationFormProps) => {

    const [organization, setOrganization] = useState(initOrg);

    return (
        <>
            <div className="grid gap-9">
                <form onSubmit={e => { e.preventDefault(); handleSubmit(organization) } }>
                    <div className="flex flex-col gap-9">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Clinic Information
                                </h3>
                            </div>
                            <div className="flex flex-col gap-5.5 p-6.5">
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Clinic Name
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={organization.name}
                                        required
                                        onChange={ e => setOrganization({ ...organization, name: e.target.value })}
                                        placeholder="Input Doctor's Full Name"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Tax Rate
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            defaultValue={organization.tax_rate}
                                            required
                                            onChange={ e => setOrganization({ ...organization, tax_rate: parseInt(e.target.value) })}
                                            className="custom-input-date custom-input-date-2 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            />
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Logo
                                    </label>
                                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                            <h3 className="font-medium text-black dark:text-white">
                                                File upload
                                            </h3>
                                        </div>
                                        <div className="flex flex-col gap-5.5 p-6.5">
                                            <div>
                                                <label className="mb-3 block text-black dark:text-white">
                                                    Attach file
                                                </label>
                                                <input
                                                    type="file"
                                                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                                    />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <SubmitButton />
                </form>
            </div>
        </>
    )

}

export default AdministrationForm;