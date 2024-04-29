import NavBar from "@/components/NavBar";
import NavBarHook from "@/components/NavBarHook";
import { useState , useEffect } from "react";

export default function Authenticated({ user, header, children, auth }) {
// console.log(user);
const [userRole, setUserRole] = useState(null);

useEffect(() => {
    if (user && user.id) {
        // Fetch user role using the user ID
        fetch(`/api/user/${user.id}/role`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user role');
                }
                return response.json();
            })
            .then(data => {
                // Assuming the response contains user role data
                setUserRole(data.role_id); 
                // Assuming the role is stored in a 'role' field\
               
            })
            .catch(error => {
                console.error('Error fetching user role:', error);
            });
    }
}, [user]);
    return (
        <div className="bg-gray-100 ">
            {/* <NavBarHook></NavBarHook> */}
         <NavBar user={user}></NavBar>
            <main style={{ marginTop: '150px' }}>
                {(userRole == 4 && (user.avatar == "/useravatar.png" || user.profile_description == null)) && (
            <>
            <div className="mx-6 text-red-500">
                <span>Note: Enhance your profile! Update your picture, craft an engaging description, and showcase your available vaccines. A captivating profile picture, coupled with a compelling description, sets the stage for your presence. Highlighting your available vaccines adds credibility and trustworthiness, fostering a positive user experience and encouraging engagement.</span>
            </div>
            </>
                )}
                {children}</main>
        </div>
    );
}
