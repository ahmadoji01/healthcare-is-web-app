'use client';

import "@/styles/globals.css";
import "@/styles/data-tables-css.css";
import "@/styles/satoshi.css";

import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import CheckoutReview from './checkout-review';
import Link from "next/link";
import RegisterFinished from "@/app/operational/front-desk/patient-registration/common/register-finished";
import PatientInputForm from "@/app/operational/front-desk/patient-registration/new-patient/patient-input-form";
import Payment from "./payment";

const steps = ['Review Items', 'Payment'];

function getStepContent(step: number, handleNext: () => void) {
  switch (step) {
    case 0:
      return <CheckoutReview />;
    case 1:
      return <Payment />;
    default:
      throw new Error('Unknown step');
  }
}

const Checkout = () => {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <div className="relative flex flex-1 flex-col">
            <h4 className="text-title-md font-bold text-black dark:text-white text-center align-middle">
                Checkout
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
                    {getStepContent(activeStep, handleNext)}
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
                            <Link
                            href="#"
                            onClick={handleNext}
                            className="flex flex-col items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 gap-4">
                                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Checkout;