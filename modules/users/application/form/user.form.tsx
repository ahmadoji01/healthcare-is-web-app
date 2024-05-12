'use client';

import { useState } from "react";
import { ROLES } from "../../domain/users.constants";
import { defaultUser } from "../../domain/user";
import { defaultDoctor } from "@/modules/doctors/domain/doctor";
import { defaultStaff } from "@/modules/staffs/domain/staff";
import DoctorForm from "@/modules/doctors/application/form/doctor.form";
import DoctorAccountForm from "./doctor-account.form";
import StaffAccountForm from "./staff-account.form";

const UserForm = () => {

    const [user, setUser] = useState(defaultUser);
    const [doctor, setDoctor] = useState(defaultDoctor);
    const [staff, setStaff] = useState(defaultStaff);

    return (
        <>
            <div className="grid gap-9">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Account Information
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    First Name
                                </label>
                                <input
                                    onChange={ e => setUser({ ...user, first_name: e.target.value })}
                                    type="text"
                                    placeholder="Input Your First Name"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Last Name
                                </label>
                                <input
                                    onChange={ e => setUser({ ...user, last_name: e.target.value })}
                                    type="text"
                                    placeholder="Input Your Last Name"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Email
                                </label>
                                <input
                                    onChange={ e => setUser({ ...user, email: e.target.value })}
                                    type="text"
                                    placeholder="Input Your Email"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Password
                                </label>
                                <input
                                    onChange={ e => setUser({ ...user, password: e.target.value })}
                                    type="password"
                                    placeholder="Input Your Password"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Roles
                                </label>
                                <div className="relative z-20 bg-white dark:bg-form-input">
                                    <select onChange={e => setUser({ ...user, role_name: e.target.value })} className="custom-input-date custom-input-date-2 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                                        <option value={ROLES.doctor}>{ROLES.doctor}</option>
                                        <option value={ROLES.administrator}>{ROLES.administrator}</option>
                                        <option value={ROLES.apothecary}>{ROLES.apothecary}</option>
                                        <option value={ROLES.cashier}>{ROLES.cashier}</option>
                                        <option value={ROLES.receptionist}>{ROLES.receptionist}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            { user.role_name === ROLES.doctor ?
                <DoctorAccountForm doctor={doctor} setDoctor={setDoctor} />
                : <StaffAccountForm staff={staff} setStaff={setStaff} />
            }
        </>
    )
}

export default UserForm;