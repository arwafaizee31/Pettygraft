import React from "react";
import NavBar from "@/components/NavBar";
import OwnerMyPetsCard from "@/components/OwnerMyPetsCard";
import { useEffect, useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests

export default function MyPets({auth}) {
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
            <NavBar></NavBar>
            <div className="OwnerMyPetsCardContainer">
            {ownerMyPets.map((pet) => (
          <OwnerMyPetsCard key={pet.id} pet={pet} /> // Pass each pet as a prop to OwnerMyPetsCard
        ))}
        {ownerMyPets.map((pet) => (
  <OwnerMyPetsCard key={pet.id} pet={pet} />
))}

            </div>
        </>
    );
}
