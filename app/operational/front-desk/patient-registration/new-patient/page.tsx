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
import { usePatientContext } from "@/contexts/patient-context";
import { createAPatient } from "@/modules/patients/domain/patients.actions";
import { defaultPatient, patientMapper, patientNoIDMapper } from "@/modules/patients/domain/patient";
import { useUserContext } from "@/contexts/user-context";
import { useAlertContext } from "@/contexts/alert-context";
import { defaultMedicalRecord, medicalRecordCreatorMapper, medicalRecordMapper, medicalRecordNoIDMapper } from "@/modules/medical-records/domain/medical-record";
import { createAMedicalRecord } from "@/modules/medical-records/domain/medical-records.actions";
import { defaultVisit, visitMapper, visitCreatorMapper } from "@/modules/visits/domain/visit";
import { createAVisit, getTotalQueueByDoctorID } from "@/modules/visits/domain/visits.actions";
import { createAnOrder } from "@/modules/orders/domain/order.actions";
import { defaultOrder, orderCreatorMapper, orderMapper } from "@/modules/orders/domain/order";
import { DOCTOR_PAID, ORDER_STATUS } from "@/modules/orders/domain/order.constants";
import { CARE_TYPE } from "@/modules/medical-records/domain/medical-records.constants";
import { defaultPhysicalCheckup, physicalCheckupMapper, physicalCheckupNoIDMapper } from "@/modules/physical-checkups/domain/physical-checkup";
import { createAPhysicalCheckup } from "@/modules/physical-checkups/domain/physical-checkup.actions";
import { useFrontDeskContext } from "@/contexts/front-desk-context";
import { ORG_STATUS } from "@/modules/organizations/domain/organizations.constants";
import { useTranslations } from "next-intl";
import Spinner from "@/components/Spinner";
import { defaultDoctorOrganization, doctorOrgMapper } from "@/modules/doctors/domain/doctor";
import { getADoctorOrg } from "@/modules/doctors/domain/doctors.actions";

const steps = ['personal_information', 'doctor_to_visit', 'visit_status', 'review_input'];

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
    const [queueNumber, setQueueNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const {accessToken, user, organization} = useUserContext();
    const {activePatient} = usePatientContext();
    const {openSnackbarNotification} = useAlertContext();
    const {activeDoctor} = useFrontDeskContext();
    const t = useTranslations();

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleSubmit = async () => {
        if (organization.status === ORG_STATUS.close) {
            openSnackbarNotification(t('alert_msg.clinic_is_close'), "error");
            return;
        }

        setLoading(true);
        let patientNoID = patientNoIDMapper(activePatient, organization.id);
        let patient = defaultPatient;
        let isError = false;
        let queueNum = "";
        await createAPatient(accessToken, patientNoID).then( res => {
            patient = patientMapper(res);
        }).catch( err => {
            isError = true;
            return;
        });

        if (isError) {        
            setLoading(false);
            openSnackbarNotification(t('alert_msg.server_error'), 'error');
            return;
        }

        let docOrg = defaultDoctorOrganization;
        await getADoctorOrg(accessToken, { doctors_id: { _eq: activeDoctor.id } }).then( res => {
            docOrg = res[0]? doctorOrgMapper(res[0]) : defaultDoctorOrganization;
            let queue = docOrg.queue + 1;
            setQueueNumber(queue.toString());
            queueNum = queue.toString();
        }).catch( err => {
            isError = true;
            return;
        });

        if (isError) {
            setLoading(false);
            openSnackbarNotification(t('alert_msg.server_error'), 'error');
            return;
        }

        let physicalCheckup = defaultPhysicalCheckup;
        physicalCheckup.patient = patient;
        let physicalCheckupNoID = physicalCheckupNoIDMapper(physicalCheckup, organization.id, patient.id);
        await createAPhysicalCheckup(accessToken, physicalCheckupNoID).then( res => {
            physicalCheckup = physicalCheckupMapper(res);
        }).catch( err => {
            isError = true;
            return;
        });

        if (isError) {
            setLoading(false);
            openSnackbarNotification(t('alert_msg.server_error'), 'error');
            return;
        }
        
        let medicalRecord = defaultMedicalRecord;
        medicalRecord.care_type = CARE_TYPE.outpatient;
        medicalRecord.patient = patient;
        medicalRecord.doctor = activeDoctor;
        medicalRecord.physical_checkup = physicalCheckup;
        let medicalRecordCreator = medicalRecordCreatorMapper(medicalRecord, [], organization.id);
        await createAMedicalRecord(accessToken, medicalRecordCreator).then( res => {
            medicalRecord = medicalRecordMapper(res);
        }).catch( err => {
            isError = true;
            return;
        });

        if (isError) {
            setLoading(false);
            openSnackbarNotification(t('alert_msg.server_error'), 'error');
            return;
        }

        let visit = defaultVisit;
        visit.doctor = activeDoctor;
        visit.patient = patient;
        visit.queue_number = queueNum;
        setQueueNumber(queueNum);
        visit.status = visitStatus;
        visit.medical_record = medicalRecord;
        let visitCreator = visitCreatorMapper(visit, medicalRecord.id, organization.id);
        await createAVisit(accessToken, visitCreator).then( res => {
            visit = visitMapper(res);
        }).catch( err => {
            isError = true;
            return;
        });
        
        if (isError) {
            setLoading(false);
            openSnackbarNotification(t('alert_msg.server_error'), 'error');
            return;
        }
        
        let order = defaultOrder;
        order.visit = visit;
        order.patient = patient;
        order.status = ORDER_STATUS.active;
        order.doctor_paid = DOCTOR_PAID.unpaid;
        let orderCreator = orderCreatorMapper(order, visit.id, organization.id);
        await createAnOrder(accessToken, orderCreator).then( res => {
            order = orderMapper(res);
        }).catch( err => {
            isError = true;
            return;
        });

        if (isError) {
            setLoading(false);
            openSnackbarNotification(t('alert_msg.server_error'), 'error');
            return;
        }

        openSnackbarNotification(t('alert_msg.success'), 'success');
        setActiveStep(activeStep + 1);
        return;
    }

    return (
        <div className="relative flex flex-1 flex-col">
            <h4 className="text-title-md font-bold text-black dark:text-white text-center align-middle">
                { t('front_desk.patient_registration') }
            </h4>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }} alternativeLabel>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel><p className="text-black dark:text-white">{t(label)}</p></StepLabel>
                </Step>
                ))}
            </Stepper>
            {activeStep === steps.length ? (
                <RegisterFinished queueNumber={queueNumber} />
            ) : (
                <>
                    {getStepContent(activeStep, handleNext, visitStatus, setVisitStatus)}
                    <div className="flex justify-end mt-2 gap-x-2">
                        <div className="flex-1 space-x-2">
                            { (activeStep !== 0 && !loading) && (
                                <Link
                                    href="#"
                                    onClick={handleBack}
                                    className="flex flex-col items-center justify-center rounded-full bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 gap-4">
                                    { t('back') }
                                </Link>
                            )}
                        </div>
                        <div className="flex-1">
                            { loading && <Spinner /> }
                            { (activeStep === steps.length - 1 && !loading) &&
                                <button
                                onClick={() => {handleSubmit()}}
                                className="w-full flex flex-col items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 gap-4">
                                    { t('submit_registration') }
                                </button>
                            }
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default NewPatient;