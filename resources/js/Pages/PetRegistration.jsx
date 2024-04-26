import GuestLayout from "@/Layouts/GuestLayout";
import React, { useEffect, useState } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import Heading from "@/components/Heading";
import { Head, Link, useForm } from "@inertiajs/react";
import RadioButtonsGroup from "@/components/RadioButton";

export default function PetRegistration() {
    const [genderOptions, setGenderOptions] = useState([]);

    useEffect(() => {
        fetch("/api/petsGender")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (
                    data &&
                    typeof data === "object" &&
                    Object.keys(data).length > 0
                ) {
                    const options = Object.entries(data).map(
                        ([key, value]) => ({
                            value: key,
                            label: value,
                        })
                    );
                    setGenderOptions(options);
                } else {
                    throw new Error("Invalid data format received from server");
                }
            })
            .catch((error) => {
                console.error("Error fetching gender options:", error);
            });
    }, []);

    const [petTypes, setPetTypes] = useState([]);
    useEffect(() => {
        fetch("/api/petTypes")
            .then((response) => response.json())
            .then((data) => {
                setPetTypes(data);
            })
            .catch((error) => {
                console.error("Error fetching pet types:", error);
            });
    }, []);

    const [petBreeds, setPetBreeds] = useState([]);
    useEffect(() => {
        fetch("/api/petBreeds")
            .then((response) => response.json())
            .then((data) => {
                setPetBreeds(data);
            })
            .catch((error) => {
                console.error("Error fetching pet breeds:", error);
            });
    }, []);

    const [formData, setFormData] = useState({
        petName: "",
        dob: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const { post } = useForm();
    const handleSubmit = (e) => {
        e.preventDefault();

        post("/petRegistration", formData)
            .then(() => {
                // Handle success (e.g., redirect)
            })
            .catch((error) => {
                console.error("Error submitting form:", error);
                // Handle error (e.g., show error message)
            });
    };

    return (
        <GuestLayout>
            <Heading title="Register your pets!!" />
            <form onSubmit={handleSubmit}>
                <div className="max-h-[800px] overflow-y-auto">
                    <div>
                        <TextInput
                            placeholder="pet name"
                            id="petName"
                            name="petName"
                            // value={data.petName}
                            // onChange={handleInputChange}
                        />
                    </div>
                    <div className="mt-4">
                        <TextInput
                            id="dob"
                            name="dob"
                            type="date"
                            placeholder="date of birth"
                            // value={data.dob}
                            // onChange={handleInputChange}
                        />
                    </div>
                    <RadioButtonsGroup
                        name="gender"
                        options={genderOptions}
                    ></RadioButtonsGroup>
                </div>
                <div className="flex  gap-3 justify-start mt-4">
                    <PrimaryButton type="submit">Save Pet</PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
