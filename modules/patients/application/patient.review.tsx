'use client';

import { useState } from "react";
import { Patient } from "../domain/patient";
import moment from "moment";
import SubmitButton from "@/components/Dashboard/Submit";

interface PatientReviewProps {
    patient: Patient,
}

const PatientReview = ({ patient }:PatientReviewProps) => {

    return (
        <>
            <div className="grid gap-9">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium">
                                Personal Information
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5 text-black dark:text-white">
                            <div>
                                <label className="mb-3 block">
                                    Full Name
                                </label>
                                <div className="relative font-bold">
                                    { patient.name }
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block">
                                    Birthday
                                </label>
                                <div className="relative font-bold">
                                    { moment(patient.birthday).format("l") }
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block">
                                    Gender
                                </label>
                                <div className="relative font-bold">
                                    { patient.gender }
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block">
                                    Marrital Status
                                </label>
                                <div className="relative font-bold">
                                    { patient.marrital_status }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium">
                                Family Information
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5 text-black dark:text-white">
                            <div>
                                <label className="mb-3 block">
                                    KK
                                </label>
                                <div className="relative font-bold">
                                    { patient.family_id_number }
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block">
                                    Father's Name
                                </label>
                                <div className="relative font-bold">
                                    { patient.fathers_name }
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block">
                                    Mother's Name
                                </label>
                                <div className="relative font-bold">
                                    { patient.mothers_name }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium">
                                Professional Information
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5 text-black dark:text-white">
                            <div>
                                <label className="mb-3 block">
                                    Occupation
                                </label>
                                <div className="relative font-bold">
                                    { patient.job }
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block">
                                    Education
                                </label>
                                <div className="relative font-bold">
                                    { patient.education }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium">
                                Resident Information
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5 text-black dark:text-white">
                            <div>
                                <label className="mb-3 block">
                                    NIK
                                </label>
                                <div className="relative font-bold">
                                    { patient.id_card_number }
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block">
                                    Address
                                </label>
                                <div className="relative font-bold">
                                    { patient.address }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PatientReview;