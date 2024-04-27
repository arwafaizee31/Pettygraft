import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import UserProfileCard from "@/components/UserProfileCard";
import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";

export default function Edit({ auth, mustVerifyEmail, status }) {
  
    const [RoleId, setRoleId] = useState("");
    const [loading, setLoading] = useState(true);
     const [routeUrl, setRouteUrl] = useState("");
     useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const response = await axios.get(`api/UsersbyId/${auth.user.id}`);
                const userRoles = response.data;
             console.log(userRoles);
                
                setRoleId(userRoles  ? userRoles : null);
               
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user roles:", error);
                setLoading(false);
            }
        };
    
        fetchUserRole();
    }, [auth.user.id]);
  
    useEffect(() => {
        if (!loading) {
            if (RoleId === 4) {
                setRouteUrl("/vendor");
            } else {
                setRouteUrl("/petowner");
            }
        }
    }, [RoleId, loading]);

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
                        <div class="lg:col-span-2 lg:order-last">
                            <UserProfileCard
                                imagePath={auth.user.avatar}
                                updateImageRoute={`/update-user-image/${auth.user.id}`}
                                name={auth.user.fname + " " + auth.user.lname}
                                link={`${routeUrl}/dashboard`}
                                roleId={RoleId}
                            />
                        </div>
                        <div class="lg:col-span-3">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm
                            className="max-w-xl"
                            users={auth.user}
                            usertype="user"
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
