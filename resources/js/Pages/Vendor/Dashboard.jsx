import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import * as React from "react";
import styled from "@mui/material/styles/styled";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import LineChartDashboard from "@/components/LineChartDashboard";
import DataTable from "@/components/DataTable";
import DonutChart from "react-donut-chart";
import { getDialingCode, getCountryName, getStateName , ageCalculation} from '@/utils/utils';
import CatProfileCard from "@/components/PetProfileCard";
import { useEffect, useState } from 'react';

const gradientBackground = `linear-gradient(to bottom, #e7bd0db5, #f88080)`;

// Define texture pattern
const texturePattern = `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAADXSiBfAAAAeUlEQVQImWP4//8/w3BgYGBgYEYDZWgGJUYa2GZUYioIVX0BMAwdEHcYgcMwnDoSoyYoYG5iGGJYxgYAWAKMIZRYlh3jIJGx0BoRogmICyloZpMhAPjChLgW8EDAAjAiyg7IsKjAAA4jA9UJoUAExVPEMEwNz5QRnYagDEgFgQGKEmMFqh0AAAAASUVORK5CYII=")`;

const cardPrimaryStyles = {
    backgroundImage: `${gradientBackground}, ${texturePattern}`,
    color: "white", // Text color
};

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        backgroundColor: "#f88080", // Default background color
        color: "white", // Default text color
    },
}));
const StyledBadgeWhite = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        backgroundColor: "white", // Default background color
        color: "black", // Default text color
    },
}));

const card = (
    <React.Fragment>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
                Visitors
            </Typography>
            <Typography variant="h4" component="div">
                30,794
            </Typography>
            <Typography variant="h4" component="div">
                <StyledBadge
                    badgeContent="+221%"
                    className="ml-5"
                ></StyledBadge>
            </Typography>
        </CardContent>
    </React.Fragment>
);

const cardPrimary = (
    <React.Fragment>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
                Visitors
            </Typography>
            <Typography variant="h4" component="div">
                30,794
            </Typography>
            <Typography variant="h4" component="div">
                <StyledBadgeWhite
                    badgeContent="+221%"
                    className="ml-5"
                ></StyledBadgeWhite>
            </Typography>
        </CardContent>
    </React.Fragment>
);


export default function Dashboard({ auth }) {

    const [pets, setPets] = useState([]);
    const [petStates, setPetStates] = useState({});
    const [privatePets, setPrivatePets] = useState([]);
    const [petProfilePath, setPetProfilePath] = useState("");

    useEffect(() => {
        // Fetch pets data from your API endpoint
        fetch(`/api/customPets/${auth.user.id}`) 
        .then(response => response.json())
        .then(data => {
            setPets(data);
        })
        .catch(error => {
            console.error('Error fetching custom pets:', error);
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
            let country = pet.country; // Default to owner's country
            let state= pet.state;
            if (pet.hasOwnProperty('is_private') && pet.is_private) {
                // If pet is private, use pet's country
                country = pet.owner.country;
                state = pet.owner.state;
            }
    
            const stateName = await getStateName(country, state);
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
                    if (pet.hasOwnProperty('is_private') && pet.is_private) {
                        // If it's private, handle differently
                        formattedPet[petDataField] = pet.owner.fname + " " + pet.owner.lname;
                    } else {
                        // If it's not private, display owner's name
                        formattedPet[petDataField] = pet.owner_name;
                    }
                    
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
            formattedPet['pet_country'] = pet.hasOwnProperty('is_private') ? getCountryName(pet.owner.country) : getCountryName(pet.country);
            
            formattedPet['pet_state'] = petStates[pet.id] || 'Fetching...'; 
            formattedPet['pet_city'] = pet.hasOwnProperty('is_private') ?  pet.owner.city : pet.city;
           
            formattedPet['pet_email'] = pet.owner.email;
            formattedPet['age'] = ageCalculation(pet.d_o_b);
            formattedPet['is_private'] = pet.hasOwnProperty('is_private') ? pet.is_private : false;
            formattedPet['id'] = pet.id
             return formattedPet;
        });
    };

    // Merge pets and privatePets and then format the data
    const mergedPetsData = [ ...privatePets , ...pets];
    const formattedPets = formatPetsData(mergedPetsData, petDataFields);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-lg text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <Grid
                            className="overflow-hidden shadow-sm sm:rounded-lg"
                            container
                            spacing={2}
                        >
                            <Grid item xs={12} md={5}>
                                <div className="p-3">
                                <Grid container spacing={2}>

                                    <Grid item md={6} xs={6}>
                                        <Box>
                                            <Card style={cardPrimaryStyles}>
                                                {cardPrimary}{" "}
                                            </Card>
                                        </Box>
                                    </Grid>
                                    <Grid item md={6} xs={6}>
                                        <Box>
                                            <Card>{card}</Card>
                                        </Box>
                                    </Grid>
                                    <Grid item md={6} xs={6}>
                                        <Box>
                                            <Card>{card}</Card>
                                        </Box>
                                    </Grid>
                                    <Grid item md={6} xs={6}>
                                        <Box>
                                            <Card>{card}</Card>
                                        </Box>
                                    </Grid>
                                </Grid>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <div className="">
                                    <LineChartDashboard></LineChartDashboard>
                                </div>
                            </Grid>
                            <Grid item md={8} xs={12}>
                                <div className="">
                                <DataTable tableData={formattedPets} fields={petFields} mainfields={petDataFields} options={['view']} title="Personalized Pets" headerButton="customPetAddition" viewlink="custompetProfilePage/"/>
                                </div>
                            </Grid>
                            <Grid item md={4} xs={12}>
                                <div className=" overflow-hidden shadow-sm sm:rounded-lg border-dashed border-2 border-sky-200 p-10 relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent"></div>
                                    <DonutChart
                                        data={[
                                            {
                                                label: "Cats",
                                                value: 40,
                                            },
                                            {
                                                label: "Dogs",
                                                value: 60,
                                                
                                            },
                                            
                                        ]}
                                        innerRadius={0.4}
                                        width={400}
                                        height={400}
                                        colors={['#e7bd0d',' rgb(58, 129, 188)']}
                                        strokeColor={'#f88080'}
                                        
                                    />
                                  
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
