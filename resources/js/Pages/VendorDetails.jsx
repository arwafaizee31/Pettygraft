import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { getDialingCode, ageCalculation } from "@/utils/utils";
import UserProfileCard from "@/components/UserProfileCard";
import VendorDetailsOnly from "@/components/VendorDetailsOnly";

export default function VendorDetails({ auth, mustVerifyEmail, status, vendor }) {
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
                <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg grid lg:grid-cols-5 sm:grid-cols-1 gap-2">
                        <div class="lg:col-span-2 lg:order-last">
                        <UserProfileCard
                                imagePath={vendor.avatar}
                                name={vendor.fname + " " + vendor.lname}
                                isPremium = {vendor.is_premium}
                                profileDesc = {vendor.profile_description}
                            />  
                        </div>
                        <div class="lg:col-span-3">
                            <VendorDetailsOnly pet={vendor} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
