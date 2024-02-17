'use client';

import { Doctor } from "@/modules/doctors/domain/doctor";
import { Visit } from "../domain/visit";

interface VisitReviewProps {
    doctor: Doctor,
    visit: Visit,
}

const VisitReview = ({ doctor, visit }:VisitReviewProps) => {

    return (
        <>
            <div className="grid gap-9">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium">
                                Visit Information
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5 text-black dark:text-white">
                            <div>
                                <label className="mb-3 block">
                                    Doctor to Visit
                                </label>
                                <div className="relative font-bold">
                                    { doctor.name }
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block">
                                    Visit Status
                                </label>
                                <div className="relative font-bold">
                                    { visit.status }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VisitReview;