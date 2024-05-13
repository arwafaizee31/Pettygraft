import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import NavBar from "@/components/NavBar";
import OwnerMyPetsCard from "@/components/OwnerMyPetsCard";
import { useEffect, useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "@/components/PrimaryButton";
import { Head } from "@inertiajs/react";

export default function MyPets({ auth, link }) {
    const [ownerMyPets, setownerMyPets] = useState([]);
    useEffect(() => {
        fetch(`/api/ownerMyPets/${auth.user.id}`)
            .then((response) => response.json())
            .then((data) => {
                setownerMyPets(data.pets); // Set only the pets array from the response data
            })
            .catch((error) => {
                console.error("Error fetching private pets:", error);
            });
    }, [auth.user.id]);
    return (
        <>
         <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-lg text-gray-800 leading-tight">
                    All Vaccines
                </h2>
            }
        >
            {/* <NavBar></NavBar> */}
            <Head title="My Pets" />
            <div className="text-5xl myPetsHeading">
                <strong>My Pets </strong>
            </div>
            <div className="OwnerMyPetsCardContainer">
                <div className="row">
                    <div
                        className={`grid ${
                            ownerMyPets.length === 1
                                ? "md:grid-cols-1 md:gap-1 col-span-1 lg:grid-cols-3 lg:gap-3 lg:col-span-3"
                                : "lg:grid-cols-3 lg:gap-3 md:grid-cols-2 md:gap-2 sm:grid-cols-12 "
                        }`}
                    >
                        {ownerMyPets.map((pet) => (
                            <div
                                className={`grid ${
                                    ownerMyPets.length === 1
                                        ? "lg:col-start-2 md:col-start-1"
                                        : ""
                                }`}
                            >
                                <OwnerMyPetsCard key={pet.id} pet={pet} profile={`petProfilePage/${pet.id}`}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="addMorePets">
                <PrimaryButton>
                    <a href="/petowner/petRegistration">Add more pets</a>
                </PrimaryButton>
            </div>
            </AuthenticatedLayout>
        </>
    );
}
