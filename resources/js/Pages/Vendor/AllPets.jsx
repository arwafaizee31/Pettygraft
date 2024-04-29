import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useEffect, useState } from 'react';
import DataTable from "@/components/DataTable";
import { getDialingCode, getCountryName, getStateName , ageCalculation} from '@/utils/utils';
import PetProfileCard from "@/components/PetProfileCard";

export default function AllPets({ auth }) {
    const [pets, setPets] = useState([]);
    const [petStates, setPetStates] = useState({});
    const [privatePets, setPrivatePets] = useState([]);

    useEffect(() => {
        // Fetch pets data from your API endpoint
        fetch('/api/allPets') 
            .then(response => response.json())
            .then(data => {
                setPets(data);
            })
            .catch(error => {
                console.error('Error fetching pets:', error);
            });
        
        // Fetch private pets data from your API endpoint
        fetch(`/api/privatePets/${auth.user.id}`) 
            .then(response => response.json())
            .then(data => {
                setPrivatePets(data);
            })
            .catch(error => {
                console.error('Error fetching private pets:', error);
            });
        
    }, [auth.user.id]);

    useEffect(() => {
        // Fetch pet states when pets data changes
        fetchPetStates([...pets, ...privatePets]);
    }, [pets, privatePets]);

    const fetchPetStates = async (petsData) => {
        const states = {};
        for (const pet of petsData) {
            const stateName = await getStateName(pet.owner.country, pet.owner.state);
            states[pet.id] = stateName;
        }
        setPetStates(states);
    };

    const petFields = ['Name', 'Owner Name',  'Date of birth', 'Gender','Last Vaccination Date','Contact no.','Location','Action'];
    const petDataFields = ['pet_name', 'owner_id', 'd_o_b', 'gender','last_vaccine_date','pet_contact','pet_location','Action'];
    const formatPetsData = (petsData, petDataFields) => {   
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const formattedDate = date.toLocaleDateString('en-US', options);
    
            // Convert day to the desired format (e.g., 19th, 1st, etc.)
            const day = date.getDate();
            let daySuffix = '';
            switch (day) {
                case 1:
                case 21:
                case 31:
                    daySuffix = 'st';
                    break;
                case 2:
                case 22:
                    daySuffix = 'nd';
                    break;
                case 3:
                case 23:
                    daySuffix = 'rd';
                    break;
                default:
                    daySuffix = 'th';
                    break;
            }
    
            // Append the day suffix to the formatted date
            return formattedDate.replace(/\b\d+\b/, match => match + daySuffix);
        };

        return petsData.map(pet => {
            
            const formattedPet = {};

            petDataFields.forEach(petDataField => {
                if (petDataField === 'owner_id' && pet.owner) {
                    formattedPet[petDataField] = pet.owner.fname +" "+ pet.owner.lname;
                } else if (petDataField === 'd_o_b' || petDataField === 'last_vaccine_date') {
                    // Format dates
                    formattedPet[petDataField] = formatDate(pet[petDataField]);
                } else {
                    formattedPet[petDataField] = pet[petDataField];
                }
            });

            formattedPet['type_id'] = pet.type_id;
            formattedPet['breed'] = pet.breeds.breed_display_name;
            formattedPet['pet_contact'] = "+" + getDialingCode(pet.owner.country_code) +" "+ pet.owner.phone_no;
            formattedPet['pet_country'] = getCountryName(pet.owner.country);
            formattedPet['pet_state'] = petStates[pet.id] || 'Fetching...'; 
            formattedPet['pet_city'] = pet.owner.city;
            formattedPet['pet_email'] = pet.owner.email;
            formattedPet['age'] = ageCalculation(pet.d_o_b);
            formattedPet['is_private'] = pet.is_private;
            
            return formattedPet;
        });
    };

    // Merge pets and privatePets and then format the data
    const mergedPetsData = [...pets, ...privatePets];
    const formattedPets = formatPetsData(mergedPetsData, petDataFields);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-lg text-gray-800 leading-tight">
                    All Pets
                </h2>
            }
        >
            <Head title="All Pets" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="">
                        <DataTable tableData={formattedPets} fields={petFields} mainfields={petDataFields} options={['view']} title="All Pets"  enableFilter={false}/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
