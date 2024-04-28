import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "@/Pages/Profile/Partials/DeleteUserForm";
import PrivateVendorForm from "@/components/PrivateVendorForm";
import UpdatePetProfileForm from "@/components/UpdatePetProfileForm"; // Adjust the path as needed
import PetProfileCard from "@/components/PetProfileCard";
import { Head } from "@inertiajs/react";
import { getDialingCode, ageCalculation } from "@/utils/utils";

export default function CustomPetProfilePage({ auth, mustVerifyEmail, status, pet , roleId }) {

    
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
                            <PetProfileCard
                                petName={pet.pet_name}
                                petType={pet.type_id}
                                petGender={pet.gender}
                                petBreed={pet.breeds.breed_display_name}
                                parentName={
                                    pet.owner_name
                                }
                                contact={
                                    "+" +
                                    getDialingCode(pet.country_code) +
                                    " " +
                                    pet.owner_contact
                                }
                                email={pet.owner_email}
                                petAge={ageCalculation(pet.d_o_b)}
                                
                            />  
                        </div>
                        <div class="lg:col-span-3">
                            <UpdatePetProfileForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                                users={pet}
                                roleid={roleId}
                            />
                        </div>
                    </div>

                   

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm
                            className="max-w-xl"
                            users={pet}
                            usertype="pet"

                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
