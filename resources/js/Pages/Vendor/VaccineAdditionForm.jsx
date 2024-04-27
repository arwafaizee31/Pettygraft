import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import VaccineAddition from "@/components/VaccineAddition";
import UserProfileCard from "@/components/UserProfileCard";
import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";

export default function VaccineAdditionForm({ auth, mustVerifyEmail, status }) {
  
    
  
   
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg grid lg:grid-cols-5 sm:grid-cols-1 gap-2">
                       
                        <div class="lg:col-span-5">
                            <VaccineAddition
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                                user={auth.user}
                            />
                        </div>
                    </div>

                 

                   
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
