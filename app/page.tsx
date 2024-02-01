'use client';

import { signIn } from "@/modules/users/domain/users.actions";
import { useState } from "react";
import { useUserContext } from "@/contexts/user-context";

const Home = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = () => {
        signIn(email, password).then(() => {
            window.location.href = '/dashboard';
        });
    }

    return (
        <main className="">
            <div className="h-screen grid grid-cols-2">
                <div className="bg-welcome bg-cover"></div>
                <div className="bg-white">
                        <div className="p-6.5">
                            <div className="mb-4.5">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Email
                            </label>
                            <input
                                onChange={e => setEmail(e.target.value)}
                                type="email"
                                placeholder="Enter your email address"
                                className="w-full text-black rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div>
                            <label className="mb-2.5 block text-black dark:text-white">
                                Password
                            </label>
                            <input
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                                placeholder="Enter password"
                                className="w-full text-black rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                            </div>

                            <div className="mt-5 mb-5.5 flex items-center justify-between">
                                <a href="#" className="text-sm text-primary">
                                    Forget password?
                                </a>
                            </div>

                            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray" onClick={handleSignIn}>
                                Sign In
                            </button>
                        </div>
                </div>
            </div>
        </main>
    )

}

export default Home;