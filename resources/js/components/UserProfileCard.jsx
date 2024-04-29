import React from "react";
import PrimaryButton from "@/components/PrimaryButton";
import { FormControl } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making HTTP requests

export default function UserProfileCard({
    updateImageRoute,
    imagePath,
    name,
    linkDashboard,
    linkLogout,
    roleId,
    isPremium,
    profileDesc,
}) {
    const [message, setMessage] = useState("");
    const [role, setRole] = useState();
    const [imageDisabled, setImageDisabled] = useState(true);
    const [buttonsVisible, setbuttonsVisible] = useState(false);
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    const [image, setImage] = useState([]);
    useEffect(() => {
        setRole(roleId);

        setImage(`${imagePath}`);
    }, []);
    useEffect(() => {
        if (role == 4) {
            setMessage(
                "Welcome, user! Explore our platform to connect with pet owners, receive timely notifications for pet vaccinations, and enjoy a range of services. Your personalized dashboard provides comprehensive business analytics for your vaccines, ensuring you stay informed and efficient. Join us to streamline your services and enhance your pet vaccination business experience."
            );
        } else {
            setMessage(
                "Welcome pet parent! Get started by updating your profile,finding the perfect vaccination vendor, and managing your pet's data. We're here to make pet care a breeze."
            );
        }
        if (updateImageRoute && imagePath) {
            setImageDisabled(false);
        }
        if (linkDashboard && linkLogout) {
            setbuttonsVisible(true);
        }
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        fetch(updateImageRoute, {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": csrfToken, // Include CSRF token in the headers
            },
            body: formData,
        })
            .then((response) => {
                // Handle response as needed
                console.log("Image uploaded successfully");
            })
            .catch((error) => {
                // Handle error
                console.error("Error uploading image:", error);
            });

        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };
    const handleLogout = () => {
        // Send a POST request to the logout route
        axios
            .post("/logout")
            .then((response) => {
                console.log("Logout successful");
                window.location.href = "/login";
            })
            .catch((error) => {
                console.error("Logout failed:", error);
            });
    };
    return (
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow light:bg-gray-800 light:border-gray-700">
            <FormControl sx={{ m: 0, width: "100%", maxWidth: "575px" }}>
                <label htmlFor="imageInput">
                    <img
                        class="rounded-full m-auto mt-9 mb-0 border border-gray-200"
                        src={image ? image : placeholderImage} // Use placeholderImage or any default image if no image is selected
                        alt=""
                        style={{
                            width: "100%",
                            height: "auto",
                            maxWidth: "270px",
                            maxHeight: "270px",
                        }}
                    />
                </label>
                <input
                    id="imageInput"
                    type="file"
                    accept="image/png, image/jpeg"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                    disabled={imageDisabled}
                />
                {/* Other pet profile information */}
            </FormControl>

            <div class="p-5">
                <div class="flex gap-2 justify-center align-center">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">
                        {name}
                    </h5>
                    {isPremium == 1 && (
                        <svg
                            class="w-6 h-6 text-gray-800 mt-1"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#f88080"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill="#f88080"
                                d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"
                            />
                            <path
                                fill="#fff"
                                d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"
                            />
                        </svg>
                    )}
                </div>
                {profileDesc ? (
                    <p class="mb-3 font-normal">{profileDesc}</p>
                ) : (
                    <p class="mb-3 font-normal">{message}</p>
                )}

                {buttonsVisible && (
                    <>
                        <em class="mb-3   text-gray-200 dark:text-gray-400 font-bold">
                            Team PettyGrapht
                        </em>
                        <div class="mt-4">
                            <PrimaryButton link={linkDashboard}>
                                Go to Dashboard
                            </PrimaryButton>
                        </div>
                        <div class="mt-4">
                            {/* <PrimaryButton link={linkLogout}>Logout</PrimaryButton> */}
                            <PrimaryButton onClick={handleLogout}>
                                Logout
                            </PrimaryButton>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
