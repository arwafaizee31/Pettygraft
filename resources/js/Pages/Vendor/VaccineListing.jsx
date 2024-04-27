import DataTable from "@/components/DataTable";
import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    getDialingCode,
    getCountryName,
    getStateName,
    ageCalculation,
} from "@/utils/utils";
import PetProfileCard from "@/components/PetProfileCard";

export default function VaccineListing({ auth }) {
    const [vaccines, setVaccines] = useState([]);

    useEffect(() => {
        // Fetch pets data from your API endpoint
        fetch("/api/allVaccines")
            .then((response) => response.json())
            .then((data) => {
                setVaccines(data);
            })
            .catch((error) => {
                console.error("Error fetching vaccines:", error);
            });
    }, []);

    const vaccineFields = [
        "Name",
        "Pet Type",
        "Minimum Age",
        "Maximum Age",
        "Action",
    ];
    const vaccineDataFields = [
        "vaccine_name",
        "pet_type_id",
        "min_age",
        "max_age",
        "Action",
    ];
    const formatvaccinesData = (vaccines, vaccineDataFields) => {
       const formatAge = (age) =>{
        return age + " years"
       }

        return vaccines.map((vaccine) => {
            const formattedVaccine = {};

            vaccineDataFields.forEach((vaccineDataField) => {
                formattedVaccine[vaccineDataField] = vaccine[vaccineDataField];
            });

            formattedVaccine["pet_type_id"] = vaccine.pet_type_id;
            formattedVaccine["min_age"] = formatAge(vaccine.min_age);
            formattedVaccine["max_age"] = formatAge(vaccine.max_age);
            return formattedVaccine;
        });
    };
    const formattedVaccines = formatvaccinesData(vaccines, vaccineDataFields);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-lg text-gray-800 leading-tight">
                    All Vaccines
                </h2>
            }
        >
            <Head title="All Pets" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="">
                        <DataTable
                            tableData={formattedVaccines}
                            fields={vaccineFields}
                            mainfields={vaccineDataFields}
                            options={["add"]}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
