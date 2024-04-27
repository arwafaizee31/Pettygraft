import React from "react";
import PrimaryButton from "@/components/PrimaryButton";
import { FormControl } from "@mui/material";
import { useState, useEffect } from "react";
export default function UserProfileCard({ updateImageRoute, imagePath, name , link ,roleId}) {

    const [message, setMessage] = useState("");
    const [role, setRole] = useState("");
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    const [image, setImage] = useState([]);
    useEffect(() => {
       setRole(roleId);
      
        if(roleId == 4){

            setMessage("Welcome, user! Explore our platform to connect with pet owners, receive timely notifications for pet vaccinations, and enjoy a range of services. Your personalized dashboard provides comprehensive business analytics for your vaccines, ensuring you stay informed and efficient. Join us to streamline your services and enhance your pet vaccination business experience.");
           
        }
        else{
            setMessage("Welcome pet parent! Get started by updating your profile,finding the perfect vaccination vendor, and managing your pet's data. We're here to make pet care a breeze.");
        }
        setImage(`${imagePath}`);
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
                />
                {/* Other pet profile information */}
            </FormControl>

            <div class="p-5">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">
                        {name}
                    </h5>
                </a>
                <p class="mb-3 font-normal">
                   {message}
                </p>
                <em class="mb-3   text-gray-200 dark:text-gray-400 font-bold">
                    Team PettyGrapht
                </em>
                <div class="mt-4">
                    <PrimaryButton link={link}>Go to Dashboard</PrimaryButton>
                </div>
            </div>
        </div>
    );
}
