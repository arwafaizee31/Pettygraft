import React from "react";
import NavBar from "@/components/NavBar";

import VendorCard from "@/components/VendorCard";
import { useEffect, useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "@/components/PrimaryButton";
import { Head } from "@inertiajs/react";

export default function MyPets() {
    const [premiumVendors, setpremiumVendors] = useState([]);
    useEffect(() => {
        // Fetch premium vendors data from your API endpoint
        fetch('/api/premiumVendors')
            .then(response => response.json())
            .then(data => {
                setpremiumVendors(data);
            })
            .catch(error => {
                console.error('Error fetching premium vendors:', error);
            });
    }, []);
   
    return (
        <>
            <NavBar></NavBar>
            <Head title="My Pets" />
            <div className="text-5xl myPetsHeading">
                <strong>My Pets </strong>
            </div>
            <div className="">
            <div className="grid grid-cols-3 md:grid-cols-3">
                {premiumVendors.map((vendor, index) => (
                    <div className="lg:col-span-1 md:col-span-1 sm:col-span-3" key={index}>
                      <VendorCard vendor={vendor} />
                    </div>
                ))}
            </div>
                       
                    </div>
                    <div class="grid grid-cols-1">
            <div class="text-center" style={{marginTop:'470px'}}>
                <PrimaryButton link="allVendors">
                   View More
                </PrimaryButton>
                </div>
                </div>
        </>
    );
}
