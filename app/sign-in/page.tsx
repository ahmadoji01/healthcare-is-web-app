'use client';

import CheckboxOne from "@/components/Dashboard/Checkboxes/CheckboxOne";
import { signIn } from "@/modules/users/domain/users.actions";
import { defaultResponse } from "@/utils/fetch-response";
import { useEffect, useState } from "react";
import RememberMe from "./common/remember-me";

const SignInPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState(defaultResponse);

    const handleSignIn = () => {
        let resp = {...response};
        resp.loading = false;
        setResponse(resp);
        signIn(email, password).then(response => setResponse(response));
    }

    return (
        <section className="">
            <div className="h-screen grid grid-cols-2">
                <div className="bg-welcome bg-cover"></div>
                <div className="bg-white">
                    <form action="#">
                        <div className="p-6.5">
                            <div className="text-black">
                                { response.error && response.statusCode + ": " + response.errorMessage }
                            </div>
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
                                <RememberMe />

                                <a href="#" className="text-sm text-primary">
                                    Forget password?
                                </a>
                            </div>

                            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray" onClick={handleSignIn}>
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )

}

export default SignInPage;