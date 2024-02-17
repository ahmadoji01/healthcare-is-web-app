'use client';

import "@/styles/globals.css";
import "@/styles/data-tables-css.css";
import "@/styles/satoshi.css";

import { Dispatch, SetStateAction, useState } from "react";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Review from '../common/review';
import Link from "next/link";
import PatientInputForm from "./patient-input-form";
import RegisterFinished from "../common/register-finished";
import ExaminationTime from "../common/examination-time";
import DoctorToVisit from "../common/doctor-to-visit";
import { useDoctorContext } from "@/contexts/doctor-context";
import { usePatientContext } from "@/contexts/patient-context";

const steps = ['Personal Data', 'Doctor to Visit', 'Examination Time', 'Review Your Input'];

function getStepContent(step: number, handleNext: () => void, visitStatus: string, setVisitStatus: Dispatch<SetStateAction<string>>) {
  switch (step) {
    case 0:
      return <PatientInputForm handleNext={handleNext} />;
    case 1:
      return <DoctorToVisit handleNext={handleNext} />
    case 2:
        return <ExaminationTime handleNext={handleNext} setVisitStatus={setVisitStatus} />;
    case 3:
      return <Review status={visitStatus} />;
    default:
      throw new Error('Unknown step');
  }
}

const NewPatient = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [visitStatus, setVisitStatus] = useState("");
    const {activeDoctor} = useDoctorContext();
    const {activePatient} = usePatientContext();

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleSubmit = () => {
        console.log(activePatient, visitStatus, activeDoctor);
    }

    return (
        <div className="relative flex flex-1 flex-col">
            <h4 className="text-title-md font-bold text-black dark:text-white text-center align-middle">
                Patient Registration
            </h4>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }} alternativeLabel>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel><p className="text-black dark:text-white">{label}</p></StepLabel>
                </Step>
                ))}
            </Stepper>
            {activeStep === steps.length ? (
                <RegisterFinished />
            ) : (
                <>
                    {getStepContent(activeStep, handleNext, visitStatus, setVisitStatus)}
                    <div className="flex justify-end mt-2 gap-x-2">
                        <div className="flex-1 space-x-2">
                            {activeStep !== 0 && (
                                <Link
                                    href="#"
                                    onClick={handleBack}
                                    className="flex flex-col items-center justify-center rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 gap-4">
                                    Back
                                </Link>
                            )}
                        </div>
                        <div className="flex-1">
                            { activeStep === steps.length - 1 &&
                                <Link
                                href="#"
                                onClick={() => {handleSubmit(); handleNext()}}
                                className="flex flex-col items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 gap-4">
                                    Submit Registration
                                </Link>
                            }
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default NewPatient;