import React from "react";
import NavBar from "@/components/NavBar";
import OwnerMyPetsCard from "@/components/OwnerMyPetsCard";

export default function MyPets() {
    return (
        <>
            <NavBar></NavBar>
            <div className="OwnerMyPetsCardContainer">
                <OwnerMyPetsCard></OwnerMyPetsCard>
            </div>
        </>
    );
}
