import React from "react";
import NavBar from "@/components/NavBar";
import VendorProfileCard from "@/components/VendorProfileCard";
import { useEffect, useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "@/components/PrimaryButton";
import { Head } from "@inertiajs/react";
import DataTable from "@/components/DataTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { getDialingCode, getCountryName, getStateName} from '@/utils/utils';

export default function AllVendorListing({auth}) {
    const [vendors, setVendors] = useState([]);
    const [vendorStates, setVendorStates] = useState({});
    useEffect(() => {
        // Fetch premium vendors data from your API endpoint
        fetch('/api/allVendors')
            .then(response => response.json())
            .then(data => {
                setVendors(data);
            })
            .catch(error => {
                console.error('Error fetching vendors:', error);
            });
    }, []);
    useEffect(() => {
        // Fetch pet states when pets data changes
        fetchVendorStates([...vendors]);
    }, [vendors]);

    const fetchVendorStates = async (Data) => {
        const states = {};
        for (const vendor of Data) {
            const stateName = await getStateName(vendor.country, vendor.state);
            states[vendor.id] = stateName;
        }
        setVendorStates(states);
    };

    const Fields = ['Name', 'Email',  'Contact no.', 'Location','Action'];
    const DataFields = ['pet_name', 'email', 'pet_contact', 'pet_location','Action','id'];
    const formatData = (Data,DataFields) => {   
       

        return Data.map(data => {
            
            const formattedPet = {};

            DataFields.forEach(DataField => {
                if (DataField === 'pet_name') {
                    formattedPet[DataField] = data.fname +" "+ data.lname;
                }  else {
                    formattedPet[DataField] = data[DataField];
                }
            });

          
            formattedPet['pet_contact'] = "+" + getDialingCode(data.country_code) +" "+ data.phone_no;
            formattedPet['pet_country'] = getCountryName(data.country);
            formattedPet['pet_state'] = vendorStates[data.id] || 'Fetching...'; 
            formattedPet['pet_city'] = data.city;
            formattedPet['avatar'] = data.avatar;
            formattedPet['is_premium'] = data.is_premium;
            formattedPet['vaccineIds'] = data.vaccines.map(vaccine => vaccine.id);

         
            return formattedPet;
        });
    };

    // Merge pets and privatePets and then format the data
  
    const formattedData = formatData(vendors,DataFields);

    return (
        <>
            <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-lg text-gray-800 leading-tight">
                    All Vendors
                </h2>
        }
        >
            <Head title="Vendors" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="">
                    <DataTable tableData={formattedData} fields={Fields} mainfields={DataFields} options={['view']} title="All Vendors" enableFilter={true} viewlink={`vendorDetails/`}/>
                        
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
         
        </>
    );
}
