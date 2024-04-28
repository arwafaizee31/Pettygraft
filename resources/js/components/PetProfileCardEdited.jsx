import React from "react";
import { useState, useEffect } from "react";
import { FormControl } from "@mui/material";
const PetProfileCard = ({
    petName,
    petType,
    petGender,
    petBreed,
    parentName,
    contact,
    email,
    petAge,
    updateImageRoute,
    imagePath,
}) => {
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    const [image, setImage] = useState([]);
    const [imageDisabled, setImageDisabled] = useState(false);
    const [genderOptions, setGenderOptions] = useState([]);
    const [selectedGender, setSelectedGender] = useState("");
    const [selectedGenderName, setSelectedGenderName] = useState("");
    useEffect(() => {
        // Fetch roles data from your API endpoint
        fetch("/api/petsGender")
            .then((response) => response.json())
            .then((data) => {
                const options = Object.entries(data).map(([key, value]) => ({
                    value: key,
                    label: value,
                }));
                setGenderOptions(options);
                setSelectedGender(options[petGender - 1].value);
                setSelectedGenderName(options[petGender - 1].label);
                // Set roles data in state
            })
            .catch((error) => {
                console.error("Error fetching petbreeds:", error);
            });
    }, []);
    if (updateImageRoute && imagePath) {
        useEffect(() => {
            setImage(`${imagePath}`);
            setImageDisabled(false);
        }, []);
    } else {
        useEffect(() => {
            if (petType == 1) {
                setImage("/dogProfile.png");
            } else {
                setImage("/catProfile.png");
            }
            setImageDisabled(true);
        }, []);
    }
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
        <>
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow light:bg-gray-800 light:border-gray-700">
                <FormControl sx={{ m: 0, width: "100%", maxWidth: "575px" }}>
                    <label htmlFor="imageInput">
                        <img
                            class=""
                            src={image ? image : placeholderImage} // Use placeholderImage or any default image if no image is selected
                            alt=""
                            style={{
                                width: "100%",
                                height: "auto",
                                maxWidth: "570px",
                                maxHeight: "300px",
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
                    <h1 class="modal_pet_name text-4xl mx-auto text-center">
                        {petName}
                    </h1>
                    <div class="card-profile px-7 pb-7 pt-3">
                        <h4 class="text-center font-semibold text-xl">
                            Parent Profile
                        </h4>
                        <div class="profileCardhr mt-3"></div>
                        <p class="mt-3">
                            <div class="mt-3">
                                <p id="join" class="me-1 font-semibold">
                                    Name:
                                </p>
                                <h5 id="join">{parentName}</h5>
                            </div>

                            <div class="mt-3">
                                <p id="join" class="me-1 font-semibold">
                                    Contact Number:
                                </p>
                                <h5 id="join">{contact}</h5>
                            </div>

                            <div class="mt-3">
                                <p id="join" class="me-1 font-semibold">
                                    Email:
                                </p>
                                <h5 id="join">{email}</h5>
                            </div>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PetProfileCard;
