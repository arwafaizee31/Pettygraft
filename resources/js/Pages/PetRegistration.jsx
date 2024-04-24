import GuestLayout from "@/Layouts/GuestLayout";
import React, { useEffect, useState } from "react";
import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import Checkbox from "@/components/Checkbox";
import TextInput from "@/components/TextInput";
import Heading from "@/components/Heading";
import LocationSelector from "@/components/LocationSelector";
import ApplicationLogo from "@/components/ApplicationLogo";
import PhonenumberInput from "@/components/PhonenumberInput";

import { Head, Link, useForm } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome icon component
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { Country, State, City } from "country-state-city";
export default function PetRegistration() {
    return (
        // <div>lala</div>
        <GuestLayout>
            <Head title="Register" />

            <Heading title="Sign Up" />
            <form>
                <div className="max-h-[300px] overflow-y-auto">
                    <div>
                        <TextInput
                            icon={
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className="h-5 w-5 text-gray-400"
                                />
                            }
                        />

                    </div>
                    <div className="mt-4">
                        <TextInput
                            icon={
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className="h-5 w-5 text-gray-400"
                                />
                            }
                        />
                    </div>
                    <div className="mt-4">
                        <TextInput
                            icon={
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className="h-5 w-5 text-gray-400"
                                />
                            }
                        />
                    </div>

                    <div className="mt-4">
                        <TextInput
                            icon={
                                <FontAwesomeIcon
                                    icon={faLock}
                                    className="h-5 w-5 text-gray-400"
                                />
                            }
                        />
                    </div>

                    <div className="mt-4">
                        <TextInput
                            icon={
                                <FontAwesomeIcon
                                    icon={faLock}
                                    className="h-5 w-5 text-gray-400"
                                />
                            }
                        />
                    </div>
               

                
                </div>
                <div className="flex  gap-3 justify-start mt-4">
                    <Link
                        href={route("login")}
                        className="underline lg:hidden md:hidden text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already a member?
                    </Link>
                    <PrimaryButton
                       
                    >
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
