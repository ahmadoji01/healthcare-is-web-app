'use client';

import "@/styles/globals.css";
import "@/styles/data-tables-css.css";
import "@/styles/satoshi.css";

import * as React from 'react';
import Link from "next/link";

const PatientRegistration = () => {
    return (
        <div className="relative flex flex-1 flex-col h-dvh">
            <h4 className="text-title-md font-bold text-black dark:text-white text-center h-fit">
                Patient Registration
            </h4>
            <div className="h-full">
              <div className="flex justify-end mt-2 h-1/2">
                  <Link
                      href="patient-registration/new-patient"
                      className="inline-block align-middle w-full bg-meta-3 py-4 px-10 text-center text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                      New Patient
                  </Link>
              </div>
              <div className="flex justify-end mt-2 h-1/2">
                  <Link
                      href="patient-registration/existing-patient"
                      className="flex-1 grow bg-primary py-4 px-10 text-center text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                      Existing Patient
                  </Link>
              </div>
            </div>
        </div>
    )
}

export default PatientRegistration;