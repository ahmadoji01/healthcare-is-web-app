'use client';

import "@/styles/globals.css";
import "@/styles/data-tables-css.css";
import "@/styles/satoshi.css";

import * as React from 'react';
import Review from './common/review';
import Link from "next/link";
import PatientInputForm from "./new-patient/patient-input-form";
import ExaminationTime from "./common/examination-time";

const steps = ['Personal Data', 'Examination Time', 'Review Your Input'];

function getStepContent(step: number, handleNext: () => void) {
  switch (step) {
    case 0:
      return <PatientInputForm />;
    case 1:
      return <ExaminationTime handleNext={handleNext} />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

const PatientRegistration = () => {
    return (
        <div className="relative flex flex-1 flex-col">
            <h4 className="text-title-md font-bold text-black dark:text-white text-center">
                Patient Registration
            </h4>
            <div className="flex justify-end mt-2">
                <Link
                    href="patient-registration/new-patient"
                    className="flex-1 grow items-center justify-center rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                    New Patient
                </Link>
            </div>
            <div className="flex justify-end mt-2">
                <Link
                    href="patient-registration/existing-patient"
                    className="flex-1 grow items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                    Existing Patient
                </Link>
            </div>
        </div>
    )
}

export default PatientRegistration;