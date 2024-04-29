import React from "react";
import { getDialingCode, getCountryName, getStateName } from '@/utils/utils';
import  { useEffect, useState } from 'react';
export default function VendorDetailsOnly({ pet }) {
    const [petStates, setPetStates] = useState("");
    const vaccineNames = pet.vaccines.map(vaccine => vaccine.vaccine_name).join(', ');
    console.log(pet.vaccines);
    useEffect(() => {
        // Fetch pet states when pets data changes
        const fetchStateName = async () => {
            try {
                const stateName = await getStateName(pet.country, pet.state);
                setPetStates(stateName);
            } catch (error) {
                console.error('Error fetching state name:', error);
                setPetStates('Error fetching state');
            }
        };

        fetchStateName();
    }, [pet]);
    return (
        <div className="pet-details">
            <div>
                <div class="container">
                

                    <div class="grid lg:grid-cols-3 lg:gap-3 md:grid-cols-2 sm:grid-cols-1 p-4">
                  <strong>      <div class="col">Email:</div>
</strong>                        <div class="col">{pet.email}</div>
                    </div>
                    <div class="grid lg:grid-cols-3 lg:gap-3 md:grid-cols-2 sm:grid-cols-1 p-4">
                    <strong>    <div class="col">Contact no.: </div></strong>
                        <div class="col">{`+${getDialingCode(pet.country_code)} ${pet.phone_no}`}</div>
                    </div>
                    <div class="grid lg:grid-cols-3 lg:gap-3 md:grid-cols-2 sm:grid-cols-1 p-4">
                        <strong><div class="col">Country: </div></strong>
                        <div class="col"> {getCountryName(pet.country)}</div>
                    </div>
                    <div class="grid lg:grid-cols-3 lg:gap-3 md:grid-cols-2 sm:grid-cols-1 p-4">
                        <strong><div class="col">State:</div></strong>
                        <div class="col">{petStates}</div>
                    </div>
                    <div class="grid lg:grid-cols-3 lg:gap-3 md:grid-cols-2 sm:grid-cols-1 p-4">
                        <strong><div class="col">City:</div></strong>
                        <div class="col">{pet.city}</div>
                    </div>
                    <div class="grid lg:grid-cols-3 lg:gap-3 md:grid-cols-2 sm:grid-cols-1 p-4">
                        <strong><div class="col">Vaccines Available:</div></strong>
                        <div class="col">{vaccineNames}</div>
                    </div>
                
                </div>
            </div>
        </div>
    );
}
