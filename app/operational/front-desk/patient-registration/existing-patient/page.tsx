'use client';

import "@/styles/globals.css";
import "@/styles/data-tables-css.css";
import "@/styles/satoshi.css";

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Review from '../common/review';
import Link from "next/link";
import RegisterFinished from "../common/register-finished";
import ExaminationTime from "../common/examination-time";
import PatientSearchForm from "./patient-search-form";
import DoctorToVisit from "../common/doctor-to-visit";
import { defaultPhysicalCheckup, physicalCheckupMapper, physicalCheckupNoIDMapper } from "@/modules/physical-checkups/domain/physical-checkup";
import { Dispatch, SetStateAction, useState } from "react";
import { usePatientContext } from "@/contexts/patient-context";
import { useUserContext } from "@/contexts/user-context";
import { useAlertContext } from "@/contexts/alert-context";
import { useDoctorContext } from "@/contexts/doctor-context";
import { createAPhysicalCheckup } from "@/modules/physical-checkups/domain/physical-checkup.actions";
import { ALERT_MESSAGE } from "@/constants/alert";
import { defaultMedicalRecord, medicalRecordMapper, medicalRecordNoIDMapper } from "@/modules/medical-records/domain/medical-record";
import { CARE_TYPE } from "@/modules/medical-records/domain/medical-records.constants";
import { createAMedicalRecord } from "@/modules/medical-records/domain/medical-records.actions";
import { defaultVisit, visitCreatorMapper, visitMapper } from "@/modules/visits/domain/visit";
import { createAVisit } from "@/modules/visits/domain/visits.actions";
import { defaultOrder, orderCreatorMapper, orderMapper } from "@/modules/orders/domain/order";
import { ORDER_STATUS } from "@/modules/orders/domain/order.constants";
import { createAnOrder } from "@/modules/orders/domain/order.actions";

const steps = ['Search Your Data', 'Doctor to Visit', 'Examination Time', 'Review Your Input'];

function getStepContent(step: number, handleNext: () => void, visitStatus: string, setVisitStatus: Dispatch<SetStateAction<string>>) {
    switch (step) {
      case 0:
        return <PatientSearchForm handleNext={handleNext} />;
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

const ExistingPatient = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [visitStatus, setVisitStatus] = useState("");
    const [queueNumber, setQueueNumber] = useState("");
    const {accessToken, user} = useUserContext();
    const {activePatient} = usePatientContext();
    const {openSnackbarNotification} = useAlertContext();
    const {activeDoctor} = useDoctorContext();


    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleSubmit = async () => {
        let physicalCheckup = defaultPhysicalCheckup;
        physicalCheckup.patient = activePatient;
        let physicalCheckupNoID = physicalCheckupNoIDMapper(physicalCheckup, user.organizationID, activePatient.id);
        await createAPhysicalCheckup(accessToken, physicalCheckupNoID).then( res => {
            physicalCheckup = physicalCheckupMapper(res);
        }).catch( err => {
            openSnackbarNotification(ALERT_MESSAGE.server_error, 'error');
            return;
        });
        
        let medicalRecord = defaultMedicalRecord;
        medicalRecord.care_type = CARE_TYPE.outpatient;
        medicalRecord.patient = activePatient;
        medicalRecord.doctor = activeDoctor;
        medicalRecord.physical_checkup = physicalCheckup;
        let medicalRecordNoID = medicalRecordNoIDMapper(medicalRecord, user.organizationID);
        await createAMedicalRecord(accessToken, medicalRecordNoID).then( res => {
            medicalRecord = medicalRecordMapper(res);
        }).catch( err => {
            openSnackbarNotification(ALERT_MESSAGE.server_error, 'error');
            return;
        });

        let visit = defaultVisit;
        visit.doctor = activeDoctor;
        visit.patient = activePatient;
        visit.queue_number = "A01";
        setQueueNumber("A01");
        visit.status = visitStatus;
        visit.medical_record = medicalRecord;
        let visitCreator = visitCreatorMapper(visit, medicalRecord.id, user.organizationID);
        await createAVisit(accessToken, visitCreator).then( res => {
            visit = visitMapper(res);
        }).catch( err => {
            openSnackbarNotification(ALERT_MESSAGE.server_error, 'error');
            return;
        });
        
        let order = defaultOrder;
        order.visit = visit;
        order.patient = activePatient;
        order.status = ORDER_STATUS.active;
        let orderCreator = orderCreatorMapper(order, visit.id, user.organizationID);
        await createAnOrder(accessToken, orderCreator).then( res => {
            order = orderMapper(res);
        }).catch( err => {
            openSnackbarNotification(ALERT_MESSAGE.server_error, 'error');
            return;
        });

        openSnackbarNotification(ALERT_MESSAGE.success, 'success');
        setActiveStep(activeStep + 1);
        return;
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
                    { activeStep > 0 &&
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
                                    onClick={() => {handleSubmit();}}
                                    className="flex flex-col items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 gap-4">
                                        Submit Registration
                                    </Link>
                                }
                            </div>
                        </div>
                    }
                </>
            )}
        </div>
    )
}

export default ExistingPatient;