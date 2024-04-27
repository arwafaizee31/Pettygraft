import React from "react";
import NavBar from "@/components/NavBar";
import OwnerMyPetsCard from "@/components/OwnerMyPetsCard";
import { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

export default function MyPets() {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        // Fetch pets data from the API
        axios.get('/api/ownerMyPets')
            .then(response => {
                setPets(response.data.pets);
            })
            .catch(error => {
                console.error('Error fetching pets data:', error);
            });
    }, []); // Empty dependency array to run effect only once

    return (
        <>
            <NavBar></NavBar>
            <div className="OwnerMyPetsCardContainer">
                <OwnerMyPetsCard pets={pets}></OwnerMyPetsCard>
            </div>
        </>
    );
}
