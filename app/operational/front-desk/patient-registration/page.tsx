'use client';

import "@/styles/globals.css";
import "@/styles/data-tables-css.css";
import "@/styles/satoshi.css";

import * as React from 'react';
import Link from "next/link";
import { useTranslation } from "react-i18next";

const PatientRegistration = () => {

    const {t} = useTranslation();

    return (
        <>
            <h4 className="text-title-md font-bold text-black dark:text-white text-center h-fit">
                { t('front_desk.patient_registration') }
            </h4>
            <div className="h-full">
              <div className="flex justify-end mt-2 h-1/2">
                  <Link
                      href="patient-registration/new-patient"
                      className="w-full inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                      <p className="text-5xl text-bold">{ t('front_desk.new_patient') }</p>
                  </Link>
              </div>
              <div className="flex justify-end mt-2 h-1/2">
                  <Link
                      href="patient-registration/existing-patient"
                      className="w-full inline-flex items-center justify-center gap-2.5 rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                      <p className="text-5xl text-bold">{ t('front_desk.existing_patient') }</p>
                  </Link>
              </div>
            </div>
        </>
    )
}

export default PatientRegistration;